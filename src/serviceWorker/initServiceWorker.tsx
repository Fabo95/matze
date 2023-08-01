'use client';

import { useEffect } from 'react';

export default function InitServiceWorker() {
  // --- EFFECTS ---

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(() => {
          console.log('Service worker registered!');
        })
        .catch((error) => {
          console.warn('Error registering service worker:');
          console.warn(error);
        });
    }

    window.addEventListener('online', async () => {
      const registration = await navigator.serviceWorker.ready;
    });
  }, []);

  // --- RENDER ---
  return null;
}
