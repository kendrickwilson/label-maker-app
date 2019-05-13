var CACHE_NAME = "cache-v1";

// ----------------------------------------------------------------------
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(
                [
                    "/index.html", "/app-controller.js", "/app-layout.css", "/app-service-worker.js"
                ]
            );
        })
    );
});

// ----------------------------------------------------------------------
self.addEventListener("fetch", (e) => {
    e.respondWith(fetch(e.request).catch(() => {
        return caches.open(CACHE_NAME).then((cache) => {
            return caches.match(e.request);
        })
    }));
});

// ----------------------------------------------------------------------
var installButton = document.getElementById("install-button");
if (installButton) {
    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        app.promptEvent = e;

        // show
        installButton.disabled = false;
        installButton.addEventListener("click", () => {
            app.promptEvent.prompt();
            //app.promptEvent.userChoice.then(handlePromptResponse);
        });
    });
}