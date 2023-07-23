const installEvent = () => {
  self.addEventListener('install', () => {
    console.log('service worker installed');
  });
};
installEvent();

const cacheName = `interval_app_${'v1'}`;

const activateEvent = () => {
  self.addEventListener('activate', (event) => {
    console.log('service worker activated');

    // @see https://developer.chrome.com/docs/workbox/service-worker-lifecycle/#activation-1
    const cacheAllowList = [cacheName];

    // Get all the currently active `Cache` instances.
    event.waitUntil(
      caches.keys().then((keys) => {
        // Delete all caches that aren't in the allow list:
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
};

activateEvent();

const fetchEvent = () => {
  self.addEventListener('fetch', (event) => {
    // We want to ignore POST requests
    if (event.request.method === 'POST') {
      return;
    }

    // @see https://developer.chrome.com/docs/workbox/caching-strategies-overview/#cache-first-falling-back-to-network
    event.respondWith(
      caches.open('cacheName').then((cache) => {
        // Go to the cache first
        return cache.match(event.request.url).then((cachedResponse) => {
          // Return a cached response if we have one
          if (cachedResponse) {
            return cachedResponse;
          }

          // Otherwise, hit the network
          return fetch(event.request).then((fetchedResponse) => {
            // Add the network response to the cache for later visits
            cache.put(event.request, fetchedResponse.clone());

            // Return the network response
            return fetchedResponse;
          });
        });
      })
    );
  });
};

fetchEvent();
