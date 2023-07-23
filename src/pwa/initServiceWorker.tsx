'use client';

import { useEffect } from 'react';
import { Workbox } from 'workbox-window';

export default function InitServiceWorker() {
  // registers a service worker located in service-worker.js on the client side.
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const wb = new Workbox('sw.js', { scope: '/' });
      wb.register();
    }
  }, []);
  return null;
}
