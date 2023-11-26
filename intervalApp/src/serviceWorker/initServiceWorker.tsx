'use client';

import { useEffect } from 'react';

import * as process from 'process';

export default function InitServiceWorker() {
  // --- EFFECTS ---

  useEffect(() => {
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

    return;
  }, []);

  // --- RENDER ---
  return null;
}
