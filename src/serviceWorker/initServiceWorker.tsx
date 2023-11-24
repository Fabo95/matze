'use client';

import * as process from 'process';

import { useEffect } from 'react';

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
  }, []);

  // --- RENDER ---
  return null;
}
