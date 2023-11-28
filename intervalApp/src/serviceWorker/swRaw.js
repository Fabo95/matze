import { handleGetRequest, handleCleanUpCache, handlePrecaching } from "src/serviceWorker/utils/helpers";
import { dynamicCacheName, staticCacheName, pageCache } from "src/serviceWorker/utils/constants";

const requestQueue = [];
self.addEventListener("install", (event) => {
    console.log("service worker installed");

    self.skipWaiting();

    event.waitUntil(handlePrecaching());
});

self.addEventListener("activate", (event) => {
    console.log("service worker activated");

    const cacheAllowList = [dynamicCacheName, staticCacheName, pageCache];

    event.waitUntil(handleCleanUpCache(cacheAllowList));
});

self.addEventListener("sync", (event) => {
    if (event.tag === "sync-failed-request") {
        event.respondWith(retryFailedRequests());
    }
});

function retryFailedRequests() {
    return Promise.all(
        requestQueue.map((request) => {
            return fetch(request)
                .then(() => requestQueue.shift())
                .catch((error) => {
                    console.error("Retrying failed requestUrl failed:", error);
                });
        })
    );
}

self.addEventListener("fetch", async (event) => {
    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(handleGetRequest(event.request));
});
