const CACHE = 'zw-v1';
const SITE = 'https://zwe.page.gd';
const FILES = [
    SITE + '/',
    SITE + '/galeria',
    '/offline.html'
];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener('fetch', e => {
    if (e.request.url.startsWith(SITE)) {
        e.respondWith(
            fetch(e.request)
                .then(res => {
                    if (res && res.status === 200) {
                        const clone = res.clone();
                        caches.open(CACHE).then(c => c.put(e.request, clone));
                    }
                    return res;
                })
                .catch(() => caches.match(e.request).then(r => r || caches.match('/offline.html')))
        );
    }
});
