import { precacheAndRoute } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope;

/* eslint no-underscore-dangle: 0 */
precacheAndRoute(self.__WB_MANIFEST);
