const CACHE_NAME = 'dansin-v1';
const ASSETS = [
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'assets/static.jpg',
  'assets/kitty-dance.gif',
  'assets/dance.jpg',
  'assets/Dancin.mp3'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});