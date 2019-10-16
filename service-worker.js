let cacheName = 'weatherPWA';
let dataCacheName = 'weatherData';
let dataUrl = 'https://publicdata-weather.firebaseio.com/';

let filesToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/scripts/app.js',
  '/scripts/localForage/dist/localforage.js',
  '/styles/ud811.css',
  '/images/clear.png',
  '/images/cloudy-scattered-showers.png',
  '/images/cloudy.png',
  '/images/fog.png',
  '/images/ic_add_white_24px.svg',
  '/images/ic_refresh_white_24px.svg',
  '/images/partly-cloudy.png',
  '/images/rain.png',
  '/images/scattered-showers.png',
  '/images/sleet.png',
  '/images/snow.png',
  '/images/thunderstorm.png',
  '/images/wind.png',
];

self.addEventListener('install', e => {
  console.log('[Service Worker] Installing');
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('activate', e => {
  console.log('[Service Worker] Activating');
  e.waitUntil(
    caches.keys().then(keyList => Promise.all(keyList.map(key => {
      if (key !== cacheName && key !== dataCacheName)
        return caches.delete(key);
    })))
  );
});

self.addEventListener('fetch', e => {
    console.log('[Service Worker] Fetch', e.request.url);
    if (e.request.url.startsWith(dataUrl)) {
      console.log('Fetching Data');
      e.respondWith(
        fetch(e.request)
          .then(response => caches.open(dataCacheName)
            .then(cache => {
              cache.put(e.request.url, response.clone());
              console.log('[Service Worker] Fetched & Cached Data');
              return response;
            })
          ).catch(e => console.error('Error when fetching...'))
      );
    } else {
      e.respondWith(
        caches.match(e.request).then(response => response || fetch(e.request))
      )
    }
  }
);