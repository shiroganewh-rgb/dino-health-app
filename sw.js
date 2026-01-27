const CACHE_NAME = 'health-monitor-v5';
const ASSETS_TO_CACHE = [
    './',
    './app-working.html',
    './history-calendar.html',
    './graph.html',
    './encyclopedia.html',
    './dinosaur-species.js',
    './character.js',
    './manifest.json',
    './assets/icons/icon-192.png',
    './assets/icons/icon-512.png',
    './assets/characters/trex_egg.png',
    './assets/characters/trex_baby.png',
    './assets/characters/trex_child.png',
    './assets/characters/trex_adult.png',
    './assets/characters/pteranodon_egg.png',
    './assets/characters/pteranodon_baby.png',
    './assets/characters/pteranodon_child.png',
    './assets/characters/pteranodon_adult.png',
    './assets/characters/triceratops_egg.png',
    './assets/characters/triceratops_baby.png',
    './assets/characters/triceratops_child.png',
    './assets/characters/triceratops_adult.png',
    './assets/characters/stegosaurus_egg.png',
    './assets/characters/stegosaurus_baby.png',
    './assets/characters/stegosaurus_child.png',
    './assets/characters/stegosaurus_adult.png',
    './assets/characters/spinosaurus_egg.png',
    './assets/characters/spinosaurus_baby.png',
    './assets/characters/spinosaurus_child.png',
    './assets/characters/spinosaurus_adult.png',
    './assets/characters/styracosaurus_egg.png',
    './assets/characters/styracosaurus_baby.png',
    './assets/characters/styracosaurus_child.png',
    './assets/characters/styracosaurus_adult.png'
];

// Install event: Cache core assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event: Network first, then cache
self.addEventListener('fetch', (event) => {
    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Clone and cache the response
                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    if (event.request.method === 'GET') {
                        cache.put(event.request, responseToCache);
                    }
                });
                return response;
            })
            .catch(() => {
                // Network failed, try cache
                return caches.match(event.request);
            })
    );
});
