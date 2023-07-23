importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

/* eslint no-underscore-dangle: 0 */
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(({ url }) => true, new NetworkFirst());
