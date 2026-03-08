# SunnyBabe Weather App — Master Plan

---

## Phase 1 — Core UI & Static Data (COMPLETE)
**Goal:** Sleek, professional weather dashboard served as a static site.

### City Tiles
- One card per city displayed in a responsive grid
- Each card shows temperature in °F and °C side by side — no toggle
- Cards show: condition icon, description, feels-like, humidity, wind speed
- Add City button in the header opens a modal
- Each card has an ✕ delete button

### Default Cities
- New York, NY
- Milwaukee, WI
- Mombasa, Kenya

### Technicals
- Python `http.server` on port 8080 (`WeatherAppCode.py`)
- Single-file app: `index.html`

---

## Phase 2 — Live Weather API (COMPLETE)
**Goal:** Replace static data with real-time weather.

- OpenWeatherMap API (key: `6d83f84f4ec74e0194482ddfa6173b45`)
- Endpoints used: `/data/2.5/weather`, `/data/2.5/forecast`, `/geo/1.0/direct`
- Geocoding autocomplete in the Add City modal (debounced, 350ms)
- Duplicate city detection by lat/lon proximity
- Loading skeleton cards while data fetches
- Error state card if fetch fails

---

## Phase 3 — Forecast Chart & Alert Quips (COMPLETE)
**Goal:** Show 5-day forecast and contextual weather commentary.

### 5-Day SVG Mini Chart
- Inline SVG line + area chart per card
- Daily high temps in °F plotted as dots with labels
- Color-keyed to current condition (gold=sunny, blue=rain, white=snow, gray=cloudy)

### Alert Quips (priority order)
- Storm incoming → warn
- Snow coming (not currently snowy) → warn
- More snow coming → warn
- Rain coming (currently sunny) → neutral
- More rain coming → neutral
- Temperature variable (swings >5°F up AND down) → neutral
- Chilly + warming → neutral
- Still chilly (<60°F) → neutral
- Warming up (>5°F rise) → good
- All sunny → good
- All clear → good
- Default: mixed conditions → neutral

---

## Phase 4 — Bratz Doll Characters (COMPLETE)
**Goal:** Personality-driven doll sprite in the bottom-right of each card.

### Sprite Sheet (`bratzDoll.png`)
- 3 dolls top row, 2 dolls bottom row
- Cropped via CSS `background-position`

### Doll Selection Rules (priority order)
1. Rainy condition → Rainy doll
2. Snowy condition OR temp < 50°F → Snowy doll
3. Temp ≥ 70°F → Extra Hot doll
4. Temp 50–69°F → Sunny doll
5. Everything else → Cloudy doll

---

## Phase 5 — Mobile-Optimized Layout (COMPLETE)
**Goal:** Responsive layout that works well as a mobile app.

- CSS Grid with `minmax(255px, 1fr)` — naturally vertical cards
- Tablet breakpoint (≤860px): 2-column grid
- Mobile breakpoint (≤520px): 1-column, bottom-sheet modal
- `env(safe-area-inset-*)` for iOS notch/home-bar support
- `viewport-fit=cover` in the meta viewport tag
- 44px minimum touch targets on all buttons

---

## Phase 6 — PWA & Netlify Deployment (COMPLETE)
**Goal:** Installable on iPhone without the App Store; publicly accessible.

### PWA Setup
- `manifest.json`: name, icons, theme color, standalone display
- `sw.js`: service worker — caches app shell offline; API calls always go live
- iOS meta tags: apple-mobile-web-app-capable, status-bar-style, title, touch icon
- App icons generated via `make_icons.py` (pure Python, no dependencies)

### Netlify Deployment
- `netlify.toml`: publish dir, cache headers for sw.js (no-cache) and icons (immutable)
- `.netlifyignore`: excludes Python files, plan, dev assets
- `deploy.py`: one-command deploy — auto-detects first vs. repeat deploy
- Live URL: **https://stupendous-dolphin-a4143d.netlify.app**

### Capacitor (iOS App Store path)
- `capacitor.config.json` ready for `npx cap add ios`
- `package.json` includes `@capacitor/core` and `@capacitor/ios`
- Build via Codemagic (cloud Mac) — no local Mac required

---

## Phase 7 — City Detail View & 10-Day Forecast (COMPLETE)
**Goal:** Tap a city card to open a full-screen detail panel with extended forecast.

### Detail Panel / Screen
- Tapping anywhere on a city card (except the ✕ button) opens a detail view
- Detail view slides in from the right on desktop; slides up from bottom on mobile
- A back/close button returns to the main grid

### Hourly Forecast Scroll (today only)
- Top section of detail view shows today's hourly forecast (next 24 hours)
- Horizontally scrollable strip: time | weather icon | temperature
- Rain probability shown beneath each hour if >10%
- Data sourced from One Call API 3.0 (`/data/3.0/onecall`) hourly array

### 8-Day Forecast Section
- Uses OpenWeatherMap One Call API 3.0 (`/onecall`) for daily data
  - Free tier: 1,000 calls/day
  - Fallback: 5-day `/forecast` endpoint if One Call unavailable/unauthorized
- Each day displayed as a horizontal row:
  - Day name | Weather icon | Condition label | Low°F / High°F | Low°C / High°C
  - Rain probability (%) shown if >20%
- Full-width SVG band chart showing high/low temperature range across all days
- Chart color-keyed to dominant condition of the week

### Extended Details
- Sunrise / Sunset times
- UV Index with label (Low / Moderate / High / Very High / Extreme)
- Visibility in miles
- Dew point
- Moon phase icon + label

### Doll in Detail View
- Same doll as the card, but larger (120×175px), displayed bottom-right
- Subtle entrance animation when detail view opens

---

## Phase 8 — Sponsored Product Links (COMPLETE)
**Goal:** Contextual women's product recommendations matched to current weather + city — monetization layer.

### Concept
- Each city card shows **2 ad chips**: 1 weather-based + 1 city/region-specific
- Detail view shows up to **4 chips** (3 weather + 1 city)
- Products target women — attire & accessories up to $50 (umbrellas, boots, jackets, sunglasses, hats)
- Chips styled with "Ad" label; weather chip is gold, city chip is purple
- All links are Amazon Associates affiliate links (`tag=phoenixsj-20`)

### Weather-to-Product Mapping (women's attire & accessories up to $50)
| Condition | Products |
|---|---|
| Stormy | Compact travel umbrella, waterproof rain jacket, rain boot booties |
| Rainy | Stylish clear umbrella, women's rain jacket, waterproof ankle boots |
| Snowy / <32°F | Insulated snow boots, women's puffer vest, thermal fleece leggings |
| Cold / 32–49°F | Women's puffer jacket, knit beanie & scarf set, touchscreen gloves |
| Chilly / 50–59°F | Women's fleece pullover, chelsea ankle boots, light cardigan |
| Mild / 60–69°F | Women's windbreaker, slip-on sneakers, denim jacket |
| Warm / 70–79°F | Wide-brim sun hat, women's sunglasses, strappy sandals |
| Hot / ≥80°F | UV-protection sunglasses, linen wide-leg pants, straw sun hat |

### City/Region-Specific Chip
- Second chip is keyed to the city name (or country code as fallback)
- 30+ city matches: Texas → Cowboy Hat Keychain 🤠, NYC → NYC Charm Bracelet 🗽, Milwaukee → Cheese Charm Keychain 🧀, etc.
- Country fallbacks for 18 countries (KE, IN, JP, AU, FR, GB, IT, ES, DE, MX, TH, AE, TR, EG, ZA, BR, MA, CA)

### Implementation
- `sponsoredLinks.js`: `SPONSORED_LINKS` (weather buckets) + `CITY_LINKS` (city keyword array) + `COUNTRY_LINKS` (ISO fallbacks)
- Functions: `getSponsoredLinks(type, tempF, count)`, `getCityLink(cityName, countryCode)`
- `buildSponsorChips(type, tempF, count, stopProp, cityName, countryCode)` renders both chips

### UI Placement
- **Card view**: 1 weather chip + 1 city chip, below forecast chart, above doll
- **Detail view**: 3 weather chips + 1 city chip in "Shop for Today's Weather" section

### Future: Dynamic Ads (Phase 8 v2)
- Connect to Amazon PA API for real-time pricing and availability
- A/B test which product categories drive most clicks by condition
- Expand city list; add state-level matching via geocoding `state` field

---

## Phase 9 — Analytics & Weather Data Monetization (PLANNED)
**Goal:** Capture rich behavioral, location, and weather-context data from users to power internal insights and create a sellable weather-intelligence data product.

---

### 9A — Product & Engagement Analytics

**What to track:**
- City card views: which cities are viewed most, time on card
- Sponsored chip clicks: which product (weather chip vs. city chip), condition at time of click, city, temp bucket
- Affiliate click-through rate (CTR) by weather bucket and city
- Detail view opens: which cities, how long spent, scroll depth in hourly strip
- Feedback submissions: star rating distribution, sentiment trends over time
- Add city / delete city events: net city retention per user session
- App open events: frequency, time of day, day of week

**Implementation options (no backend needed):**
- **Netlify Analytics** (built-in, free tier) — page views, unique visitors, top cities by URL
- **Plausible Analytics** — privacy-first, lightweight script, $9/mo, GDPR-safe; good for pitching data to partners
- **PostHog** — free self-hosted or cloud, full event tracking, funnels, session replay
- **Custom event log** — `navigator.sendBeacon()` to a free Cloudflare Worker or Supabase table; zero cost, full control

**Recommended start:** Plausible (easiest) + custom beacon for chip click events

---

### 9B — Mobile & Device Analytics

**What to capture:**
- Device type: iOS vs Android vs desktop (via User-Agent or PWA display mode)
- Screen resolution and orientation at time of weather check
- PWA install rate: how many users add to home screen vs. browser only
- Network type: WiFi vs cellular (via `navigator.connection`) — useful for weather data timing
- Locale / language preference
- App version in use (tie to sw.js cache version stamp)
- First visit vs. returning user (localStorage flag)

**Use cases:**
- Prioritize mobile UX improvements based on actual device breakdown
- Understand offline usage patterns (when service worker cache hits spike)
- Sell aggregate device + weather-context data to insurance or retail partners

---

### 9C — Location & Weather Intelligence Data

**What to collect (privacy-respecting, aggregated):**
- City-level location data: which cities are most added, which are deleted quickly
- Geo-cluster demand: group nearby cities to identify regional weather interest hotspots
- Weather condition frequency per city: how often each bucket (stormy, hot, snowy, etc.) triggers per market
- Temperature preference signals: do users in hot cities also add cold cities? (travel signals)
- Time-to-check patterns: when do users check weather for which cities (morning commute, weekend, storm events)

**Data monetization paths:**
| Buyer type | What they want | Data you have |
|---|---|---|
| Weather intelligence firms (e.g. Tomorrow.io, ClimaCell) | Consumer demand signals by city | Which cities users add, check frequency |
| Retail / e-commerce brands | Weather-driven purchase intent | Sponsored chip CTR by condition + city |
| Travel companies | Destination interest signals | City add/delete behavior, multi-city patterns |
| Insurance / agriculture | Regional weather interest spikes | Stormy/snowy bucket frequency by city cluster |
| Ad networks | Weather-contextual targeting segments | Condition bucket + device + locale per session |

**Compliance requirements before selling:**
- Add a Privacy Policy page (linked in footer)
- Cookie/tracking consent banner (required for GDPR/CCPA)
- Anonymize all data — no PII, only aggregated city-level signals
- Terms of Service mentioning data collection

---

### 9D — Implementation Roadmap

| Step | Action | Effort |
|---|---|---|
| 1 | Add Plausible script + custom chip-click beacon | Low |
| 2 | Log city add/delete/view events to Supabase free tier | Low |
| 3 | Build a simple admin dashboard (Supabase Studio or Metabase) | Medium |
| 4 | Add privacy policy + consent banner | Medium |
| 5 | Aggregate 90 days of data into a sample data report | Low |
| 6 | Pitch data product to 2–3 weather intelligence or retail firms | Business |

---

---

## Phase 10 — GA4 Analytics & User Simulation (COMPLETE)

### 10A — Google Analytics 4 Setup
- Measurement ID: `G-VZWZNRC9R6` (web data stream, `sarjank.github.io/sunnybabe`)
- Previous ID `G-QCKZPXMK4C` returned 404 from Google's CDN — replaced with fresh stream
- Script loaded async in `<head>` with `send_page_view: true`

### 10B — Event Coverage
Every meaningful user interaction tracked with `track()` helper (wraps `gtag('event', ...)`).
All events include `is_pwa`, `returning_user`, and `connection` fields automatically.

| Event | Trigger |
|---|---|
| `app_open` | Page load — includes `city_count`, `platform` |
| `geolocation_granted` | User allows location access |
| `geolocation_denied` | User blocks / times out — includes `error_code` |
| `hero_impression` | Location hero banner resolves — includes `bucket`, `city`, `product` |
| `hero_affiliate_click` | Hero CTA tapped — includes `product_label`, `bucket`, `city` |
| `modal_open` | Add City modal opened |
| `search_query_submitted` | Debounced geocode fires — includes `query_length`, `result_count` |
| `search_result_selected` | City picked from dropdown — includes `city_name`, `country` |
| `city_add` | Card created — includes `source` (`user_search` / `geolocation`), weather context |
| `city_delete` | Card removed |
| `detail_view` | Card tapped to open detail panel |
| `drag_reorder` | Card dragged to new position — includes `from_city`, `to_city` |
| `sponsor_click` | Affiliate chip clicked — includes `product_type`, `product_label`, `weather_bucket` |
| `feedback_modal_open` | Feedback FAB tapped |
| `feedback_rating_selected` | Star rating chosen — includes `rating` (1–5) |
| `feedback_submit` | Feedback successfully sent |
| `pwa_install` | App installed to home screen (`appinstalled` event) |

### 10C — User Simulation Tool (`simulate_users.py`)
Playwright headless Chromium script that fires real GA4 events through a genuine browser session.

**Three modes:**
```
python simulate_users.py               # 3 users, GA4 verify
python simulate_users.py --users 20   # 20 users, load test (5 at a time)
python simulate_users.py --continuous # loops forever, 1-3 users, 1-5 min gaps
```

**Per-session flow:** page load → detail_view → modal_open → search_query_submitted → sponsor_click

**Browser diversity:** 5 user agents, 5 locales, 6 timezones, 5 viewports — randomised per session

**Concurrency cap:** `MAX_CONCURRENT = 5` (semaphore prevents OOM on large `--users` counts)

**One-time local setup:**
```bash
pip install playwright
playwright install chromium
```

### 10D — GitHub Actions Automation (`.github/workflows/simulate-users.yml`)
- Runs every 6 hours (`cron: "0 */6 * * *"`) — 4×/day = ~240 Action-min/month (within free tier)
- Manual trigger via `workflow_dispatch` with configurable user count (default 5)
- Runner: `ubuntu-latest` — different Azure IP each run for geographic diversity
- Uses `playwright install chromium --with-deps` for Linux dependency resolution

---

| File | Purpose |
|---|---|
| `index.html` | Full app — HTML, CSS, JS (all phases) |
| `WeatherAppCode.py` | Local Python server (port 8080), shows iPhone URL |
| `bratzDoll.png` | Doll sprite sheet (5 dolls) |
| `manifest.json` | PWA manifest |
| `sw.js` | Service worker (offline app shell) |
| `make_icons.py` | Generates icons/icon-180/192/512.png |
| `deploy.py` | One-command Netlify deploy |
| `netlify.toml` | Netlify config + cache headers |
| `.netlifyignore` | Excludes non-web files from deploy |
| `capacitor.config.json` | Capacitor iOS config |
| `package.json` | Node deps (Capacitor) |
| `simulate_users.py` | Playwright GA4 user simulation (local + CI) |
| `.github/workflows/simulate-users.yml` | Scheduled GitHub Actions automation |
