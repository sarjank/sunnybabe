"""
SunnyBabe - Netlify Deploy Script
Run: python deploy.py

First-time setup (one-time only):
  npm install -g netlify-cli
  netlify login
"""

import subprocess
import sys
import os
import re
import datetime

DIR = os.path.dirname(os.path.abspath(__file__))


def bump_cache_version():
    """Stamp sw.js with a unique version so all clients get fresh content."""
    sw_path = os.path.join(DIR, 'sw.js')
    version  = 'sunnybabe-' + datetime.datetime.now().strftime('%Y%m%d%H%M%S')
    with open(sw_path, 'r', encoding='utf-8') as f:
        content = f.read()
    content = re.sub(r"const CACHE_NAME = '[^']*'", f"const CACHE_NAME = '{version}'", content)
    with open(sw_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  Cache version: {version}")


def run(cmd, capture=False):
    return subprocess.run(
        cmd, shell=True, cwd=DIR,
        capture_output=capture, text=True
    )


def check_netlify_cli():
    result = run("netlify --version", capture=True)
    return result.returncode == 0


print("\n  SunnyBabe - Netlify Deploy")
print("  ---------------------------")

# Ensure Netlify CLI is installed
if not check_netlify_cli():
    print("  Netlify CLI not found. Installing...")
    result = run("npm install -g netlify-cli")
    if result.returncode != 0:
        print("\n  ERROR: Could not install Netlify CLI.")
        print("  Make sure Node.js is installed, then run:")
        print("    npm install -g netlify-cli")
        sys.exit(1)
    print("  Netlify CLI installed.")

bump_cache_version()
print("  Deploying to Netlify (production)...\n")

# First deploy: create the site; subsequent deploys: reuse linked site
linked = os.path.exists(os.path.join(DIR, '.netlify', 'state.json'))
cmd = "netlify deploy --prod --dir ." if linked else "netlify deploy --prod --dir . --create-site"
result = run(cmd)

if result.returncode == 0:
    print("\n  Done! SunnyBabe is live on Netlify.")
else:
    print("\n  Deploy failed.")
    print("  If this is your first deploy, run once in your terminal:")
    print("    netlify login")
    print("  Then run this script again.")
    sys.exit(1)
