'use client';

import { useEffect } from 'react';
import * as process from 'process';

export default function InitServiceWorker() {
  // --- EFFECTS ---

  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        const wakeLock = await navigator.wakeLock.request('screen');
      } catch (err) {
        // The wake lock request fails - usually system-related, such as low battery.

        window.alert(err);
      }
    };

    requestWakeLock();

    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then(() => {
          console.log('Service worker registered!');
        })
        .catch((error) => {
          console.warn('Error registering:', error);
        });
    }
  }, []);

  // --- RENDER ---
  return null;
}
