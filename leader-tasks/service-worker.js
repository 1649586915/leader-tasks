// 简单缓存策略，让网页像 App 一样离线可用

const CACHE_NAME = 'leader-tasks-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './api.js',
  './export.js',
  './manifest.json'
];

// 安装 Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
});

// 激活 Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME)
                          .map(name => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// 拦截请求，先用缓存，再用网络
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
