// Service Worker for Offline Support
const CACHE_VERSION = 'v4';
const CACHE_NAME = `geiger-counter-${CACHE_VERSION}`;

// Files to cache on installation
const URLS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json'
];

// Installation event - cache files
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching app files');
                // Try to cache all files, but don't fail if some are missing
                return Promise.all(
                    URLS_TO_CACHE.map((url) => {
                        return cache.add(url).catch((err) => {
                            console.warn(`Failed to cache ${url}:`, err);
                        });
                    })
                );
            })
            .then(() => {
                console.log('All cacheable files have been processed');
                return self.skipWaiting();
            })
    );
});

// Activation event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName !== CACHE_NAME)
                    .map((cacheName) => {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    })
            );
        }).then(() => {
            console.log('Service Worker ready');
            return self.clients.claim();
        })
    );
});

// Fetch event - network first, fallback to cache (ensures fresh content)
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Only handle GET requests
    if (request.method !== 'GET') {
        return;
    }

    event.respondWith(
        fetch(request)
            .then((response) => {
                // Cache successful responses for offline use
                if (response && response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                // Offline: fall back to cache
                return caches.match(request)
                    .then((response) => {
                        return response || (request.mode === 'navigate' ? caches.match('./index.html') : undefined);
                    });
            })
    );
});

// Handle messages from clients
self.addEventListener('message', (event) => {
    console.log('Service Worker received message:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
