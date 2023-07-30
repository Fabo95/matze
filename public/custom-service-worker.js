const cacheName = `dynmaic-interval_app_${'v1'}`;
const preCacheName = `static-cache-interval_app_${'v1'}`;
const pageCache = `page-cache-interval_app_${'v1'}`;

const requestQueue = [];
self.addEventListener('install', (event) => {
  console.log('service worker installed');

  self.skipWaiting();

  // @see https://developer.chrome.com/docs/workbox/service-worker-lifecycle/#installation
  event.waitUntil(
    caches.open(preCacheName).then((cache) => {
      return fetch('./asset-manifest.json')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // Get the list of assets from the manifest file and add them to the cache
          const staticAssetPaths = Object.values(data);
          return cache.addAll(staticAssetPaths);
        })
        .catch((error) => {
          console.error(
            'Error fetching or parsing asset manifest file:',
            error
          );
        });
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('service worker activated');

  // @see https://developer.chrome.com/docs/workbox/service-worker-lifecycle/#activation-1
  const cacheAllowList = [cacheName, preCacheName, pageCache];

  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (!cacheAllowList.includes(key)) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-failed-request') {
    event.respondWith(retryFailedRequests());
  }
});

// Retry the failed requests from the queue
function retryFailedRequests() {
  return Promise.all(
    requestQueue.map((request) => {
      // Retry the requestUrl and remove it from the queue if successful
      return fetch(request)
        .then(() => requestQueue.shift())
        .catch((error) => {
          console.error('Retrying failed requestUrl failed:', error);
        });
    })
  );
}

self.addEventListener('fetch', async (event) => {
  if (event.request.method === 'GET') {
    // @see https://developer.chrome.com/docs/workbox/caching-strategies-overview/#network-first-falling-back-to-cache
    event.respondWith(
      caches.open(cacheName).then((cache) => {
        // Go to the network first
        return fetch(event.request)
          .then((fetchedResponse) => {
            cache.put(event.request, fetchedResponse.clone());

            return fetchedResponse;
          })
          .catch(() => {
            // If the network is unavailable, get
            return cache.match(event.request);
          });
      })
    );
  }
});
