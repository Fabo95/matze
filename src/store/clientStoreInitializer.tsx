'use client';

import { useRef } from 'react';

import { useIntervalStore } from 'store/intervalStore';
import { Interval } from 'api/utils/apiTypes';
import { selectSetInterval } from 'store/intervalSelectors';

export const ClientStoreInitializer = ({
  interval,
}: {
  interval: Interval;
}) => {
  // --- STATE ---

  const initialized = useRef(false);
  const setInterval = useIntervalStore(selectSetInterval);

  // --- HELPERS ---

  if (!initialized.current) {
    setInterval(interval);

    initialized.current = true;
  }

  // --- RENDER ---

  return null;
};
