var CACHE_NAME = "cache-v1";

// ----------------------------------------------------------------------
self.addEventListener("install", function(e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(
                [
                    "favicon.png", "index.html", "app-controller.js", "app-layout.css", "app-service-worker.js", "dvd.jpg"
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