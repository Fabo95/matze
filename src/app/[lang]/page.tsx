import React from 'react';

import { getTFunction } from 'i18n/get-t-function';
import { Locale } from 'utils/types';
import { IntervalTimerConfiguration } from 'ui/intervalTimer/intervalTimerConfiguration';
import { IntervalTimerCountDown } from 'ui/intervalTimer/intervalTimerCountDown';
import { apiGetInterval } from 'api/api';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = await getTFunction(lang);

  // --- DATA ---

  const interval = await apiGetInterval();

  // --- RENDER ---

  return (
    <>
      <IntervalTimerCountDown interval={interval} />
      <IntervalTimerConfiguration interval={interval} t={t} />
    </>
  );
}
