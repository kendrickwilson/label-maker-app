var CACHE_NAME = "cache-v1";

// ----------------------------------------------------------------------
self.addEventListener("install", function(e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(
                [
                    "favicon144.png", "favicon192.png", "favicon512.png", "favicon.png", "index.html", "app-controller.js", "app-layout.css", "app-service-worker.js", "dvd.jpg", "Mount-nebo-logo-white.png"
                ]
            );
        })
    );
});
// ----------------------------------------------------------------------
self.addEventListener("fetch", function(e) {
    e.respondWith(fetch(e.request).catch(function() {
        return caches.open(CACHE_NAME).then(function(cache) {
            return caches.match(e.request);
        })
    }));
});