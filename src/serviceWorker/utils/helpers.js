import {
  dynamicCacheName,
  staticCacheName,
} from 'serviceWorker/utils/constants';

export const getStaticAssetPaths = async () => {
  const assetResponse = await fetch('./asset-manifest.json');

  const staticAssetPaths = Object.values(await assetResponse.json());

  return staticAssetPaths;
};

export const getIsStaticAssetRequest = (requestUrl, staticAssetPaths) => {
  return staticAssetPaths.some((assetPath) => {
    return requestUrl.includes(assetPath);
  });
};

export const handleGetRequest = async (request) => {
  const staticAssetPaths = await getStaticAssetPaths();

  const isStaticAssetRequest = getIsStaticAssetRequest(
    request.url,
    staticAssetPaths
  );

  if (!isStaticAssetRequest) {
    const cache = await caches.open(dynamicCacheName);

    try {
      const fetchedResponse = await fetch(request);

      await cache.put(request, fetchedResponse.clone());

      return fetchedResponse;
    } catch (error) {
      return cache.match(request);
    }
  }

  if (isStaticAssetRequest) {
    const cache = await caches.open(staticCacheName);

    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    const fetchedResponse = await fetch(request);

    await cache.put(request, fetchedResponse.clone());

    return fetchedResponse;
  }
  return;
};

// @see https://developer.chrome.com/docs/workbox/service-worker-lifecycle/#installation
export const handlePrecaching = async () => {
  try {
    const cache = await caches.open(staticCacheName);

    const staticAssetPaths = await getStaticAssetPaths();

    return cache.addAll(staticAssetPaths);
  } catch (error) {
    console.error('Error:', error);
  }
};

// @see https://developer.chrome.com/docs/workbox/service-worker-lifecycle/#activation-1
export const handleCleanUpCache = async (cacheAllowList) => {
  return caches.keys().then((keys) => {
    return Promise.all(
      keys.map((key) => {
        if (!cacheAllowList.includes(key)) {
          return caches.delete(key);
        }
      })
    );
  });
};
