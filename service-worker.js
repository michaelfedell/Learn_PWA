let cacheName = 'weatherPWA';
let filesToCache = [

];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});