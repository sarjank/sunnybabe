"""
simulate_users.py — GA4 User Simulation for SunnyBabe Weather PWA
https://sarjank.github.io/sunnybabe/

Modes:
    python simulate_users.py                 # single burst, 3 users (GA4 verify)
    python simulate_users.py --users 10      # single burst, 10 users (load test)
    python simulate_users.py --continuous    # loop forever, 1-3 users, 1-5 min gaps

One-time setup:
    pip install playwright
    playwright install chromium
"""

import asyncio
import argparse
import random
from playwright.async_api import async_playwright

# ── Target ────────────────────────────────────────────────────────────────────

TARGET_URL = "https://sarjank.github.io/sunnybabe/"

# ── Browser diversity pool ────────────────────────────────────────────────────

USER_AGENTS = [
    # Chrome on Windows
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    # Chrome on macOS
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    # Chrome on Android
    "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36",
    # Safari on iPhone
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) "
    "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Mobile/15E148 Safari/604.1",
    # Edge on Windows
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0",
]

LOCALES    = ["en-US", "en-GB", "en-CA", "en-AU", "en-IN"]
TIMEZONES  = [
    "America/New_York", "America/Chicago", "America/Los_Angeles",
    "America/Denver", "Europe/London", "Australia/Sydney",
]
VIEWPORTS  = [
    {"width": 1440, "height": 900},   # desktop
    {"width": 1280, "height": 800},   # laptop
    {"width": 390,  "height": 844},   # iPhone 14
    {"width": 412,  "height": 915},   # Android large
    {"width": 768,  "height": 1024},  # tablet
]

SEARCH_CITIES = ["Tokyo", "Paris", "London", "Sydney", "Dubai", "Toronto",
                 "Berlin", "Mumbai", "Cairo", "Seoul"]

# ── Helpers ───────────────────────────────────────────────────────────────────

async def human_pause(lo: float = 0.8, hi: float = 2.5) -> None:
    await asyncio.sleep(random.uniform(lo, hi))

async def short_pause() -> None:
    await asyncio.sleep(random.uniform(0.3, 0.7))

# ── Single user session ───────────────────────────────────────────────────────

async def simulate_user(browser, user_index: int) -> None:
    ua       = random.choice(USER_AGENTS)
    locale   = random.choice(LOCALES)
    tz       = random.choice(TIMEZONES)
    viewport = random.choice(VIEWPORTS)

    context = await browser.new_context(
        user_agent=ua,
        locale=locale,
        timezone_id=tz,
        viewport=viewport,
        # Deny geolocation: Chromium immediately calls the error callback
        # instead of prompting. Fires geolocation_denied naturally, no 8s wait.
        permissions=[],
        geolocation=None,
    )

    page = await context.new_page()

    try:
        print(f"[user-{user_index}] Loading page... ({ua[:40]})")
        await page.goto(TARGET_URL, wait_until="domcontentloaded", timeout=30_000)

        # Wait for gtag to initialise (the script tag is async)
        await page.wait_for_function("typeof window.gtag === 'function'", timeout=10_000)
        print(f"[user-{user_index}] gtag ready — app_open fired")

        # Wait for at least one fully-loaded city card
        print(f"[user-{user_index}] Waiting for city cards...")
        await page.wait_for_selector(
            ".card:not(.loading):not(.error-card)",
            timeout=25_000,
        )
        await human_pause(1.0, 2.0)

        # Open city detail panel
        first_card = page.locator(".card:not(.loading):not(.error-card)").first
        await first_card.locator(".temps").click()
        print(f"[user-{user_index}] Opened detail — detail_view fired")
        await human_pause(2.0, 4.0)

        # Close detail
        await page.locator(".detail-back").click()
        await short_pause()

        # Open Add City modal
        await page.locator(".add-btn").click()
        await page.wait_for_selector(".modal-overlay.open", timeout=5_000)
        print(f"[user-{user_index}] Opened modal — modal_open fired")
        await human_pause(0.8, 1.5)

        # Type a search query (fires search_query_submitted after debounce)
        query = random.choice(SEARCH_CITIES)
        await page.locator("#cityInput").type(query, delay=random.randint(80, 140))
        print(f"[user-{user_index}] Searched '{query}' — search_query_submitted will fire")
        await asyncio.sleep(1.5)  # cover 350ms debounce + API round trip

        # Blur the search input so the suggestion dropdown closes before clicking Cancel
        await page.locator("#cityInput").evaluate("el => el.blur()")
        await asyncio.sleep(0.2)  # wait for the 150ms blur→hideSuggestions timeout

        # Close modal without adding
        await page.locator(".btn-cancel").click()
        await page.wait_for_selector(".modal-overlay.open", state="hidden", timeout=5_000)
        await human_pause(1.0, 2.5)

        # Click a random sponsor chip
        chips = page.locator("a[data-track-event='sponsor_click']")
        chip_count = await chips.count()
        if chip_count > 0:
            # Close any new tab the chip opens so the script doesn't hang
            context.on("page", lambda p: asyncio.create_task(p.close()))
            await chips.nth(random.randint(0, chip_count - 1)).click(force=True)
            print(f"[user-{user_index}] Clicked sponsor chip — sponsor_click fired")
            await short_pause()

        print(f"[user-{user_index}] Session complete")

    except Exception as exc:
        print(f"[user-{user_index}] ERROR: {exc}")
    finally:
        await page.close()
        await context.close()

# ── Batch runner ──────────────────────────────────────────────────────────────

MAX_CONCURRENT = 5  # max simultaneous Chromium instances (safe for most machines)

async def run_batch(browser, num_users: int) -> None:
    print(f"\n--- Launching {num_users} user(s) (max {MAX_CONCURRENT} at a time) ---")
    sem = asyncio.Semaphore(MAX_CONCURRENT)

    async def throttled(i):
        async with sem:
            await simulate_user(browser, i + 1)

    await asyncio.gather(*[throttled(i) for i in range(num_users)])

# ── Main ──────────────────────────────────────────────────────────────────────

async def main(num_users: int, continuous: bool) -> None:
    print(f"Target: {TARGET_URL}")
    print(f"Mode: {'continuous' if continuous else f'single burst ({num_users} users)'}\n")

    async with async_playwright() as pw:
        browser = await pw.chromium.launch(
            headless=True,
            args=["--no-sandbox", "--disable-dev-shm-usage"],
        )

        if continuous:
            batch_num = 0
            while True:
                batch_num += 1
                batch_size = random.randint(1, 3)
                print(f"=== Batch #{batch_num} ===")
                await run_batch(browser, batch_size)

                # Occasionally insert a longer quiet period (10% chance)
                if random.random() < 0.10:
                    quiet = random.uniform(120, 600)
                    print(f"Quiet period — pausing {quiet:.0f}s before next batch")
                    await asyncio.sleep(quiet)
                else:
                    pause = random.uniform(60, 300)  # 1-5 minute gap
                    print(f"Next batch in {pause:.0f}s...")
                    await asyncio.sleep(pause)
        else:
            await run_batch(browser, num_users)

        await browser.close()

    print("\nDone. Check GA4 -> Reports -> Realtime for events.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Simulate GA4 user sessions for SunnyBabe.")
    parser.add_argument(
        "--users", type=int, default=3,
        help="Number of concurrent users per batch (default: 3, load test: 10)",
    )
    parser.add_argument(
        "--continuous", action="store_true",
        help="Loop forever with 1-3 users per wave and 1-5 min gaps (organic traffic mode)",
    )
    args = parser.parse_args()
    asyncio.run(main(args.users, args.continuous))
