// SunnyBabe — Service Worker
// Strategy: network-first for HTML/JS (always fresh), cache-first for images.
// CACHE_NAME is auto-bumped by deploy.py on every deploy.

const CACHE_NAME = 'sunnybabe-20260307180611';
const APP_SHELL  = [
  './',
  './index.html',
  './sponsoredLinks.js',
  './bratzDoll.png',
  './manifest.json',
];

// Install: pre-cache the app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

// Activate: remove every old cache so stale content is gone
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch strategy
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Weather API & serverless functions: always live, never cache locally (CDN handles it)
  if (url.hostname === 'api.openweathermap.org' ||
      url.hostname === 'api.web3forms.com' ||
      url.pathname.startsWith('/.netlify/functions/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Images: cache-first (bratzDoll.png, icons — rarely change)
  if (/\.(png|jpg|jpeg|gif|svg|ico|webp)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          return res;
        });
      })
    );
    return;
  }

  // HTML, JS, everything else: network-first so updates land immediately.
  // Falls back to cache when offline.
  event.respondWith(
    fetch(event.request).then(res => {
      const clone = res.clone();
      caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
      return res;
    }).catch(() => caches.match(event.request))
  );
});
