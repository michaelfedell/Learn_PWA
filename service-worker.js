let cacheName = 'weatherPWA';
let dataCacheName = 'weatherData';
let filesToCache = [
  'index.html',
];

self.addEventListener('install', e => {
  console.log('Installing');
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('activate', e => {
  console.log('Activating');
  e.waitUntil(
    caches.keys().then(keyList => Promise.all(keyList.map(key => {
      if (key !== cacheName && key !== dataCacheName)
        return caches.delete(key);
    })))
  );
});