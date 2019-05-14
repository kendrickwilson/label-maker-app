var CACHE_NAME = "cache-v1";

// ----------------------------------------------------------------------
/*
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(
                [
                    "/favicon.png", "/index.html", "/app-controller.js", "/app-layout.css", "/app-service-worker.js"
                ]
            );
        })
    );
});
*/
// ----------------------------------------------------------------------
/*
self.addEventListener("fetch", (e) => {
    e.respondWith(fetch(e.request).catch(() => {
        return caches.open(CACHE_NAME).then((cache) => {
            return caches.match(e.request);
        })
    }));
}); 
*/
// ----------------------------------------------------------------------
var deferredPrompt;
var installButton = document.getElementById("installButton");
if (installButton) {
    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;

        installButton.style.display = 'inline-block';
        installButton.addEventListener("click", () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    installButton.style.display = 'none';
                }
                deferredPrompt = null;
            })
        });
    });
}