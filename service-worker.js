const CACHE_NAME = 'photo-gallery-v1';
const IMAGE_CACHE = 'photo-images-v1';
const STATIC_ASSETS = [
  './gallery.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Simple cache-first strategy for images, fallback to network
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.destination === 'image' || /\/my photos\//.test(url.pathname)) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(cache =>
        cache.match(event.request).then(resp => {
          if (resp) return resp;
          return fetch(event.request).then(networkResp => {
            // Put a copy in the cache (limit size implicitly by browser)
            cache.put(event.request, networkResp.clone()).catch(() => {});
            return networkResp;
          }).catch(() => new Response(null, { status: 404 }));
        })
      )
    );
    return;
  }

  // For other requests, do network-first then cache fallback
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
