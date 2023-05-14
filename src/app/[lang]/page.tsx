import React from 'react';

import { getTFunction } from 'i18n/get-t-function';
import { Locale } from 'utils/types';
import { IntervalTimerConfiguration } from 'ui/intervalTimer/IntervalTimerConfiguration/intervalTimerConfiguration';
import { IntervalTimerExecution } from 'ui/intervalTimer/IntervalTimerExecution/intervalTimerExecution';
import { apiGetInterval } from 'api/api';
import { Box } from 'base/box';

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
    <Box className="grow overflow-hidden">
      <IntervalTimerExecution
        interval={interval}
        key={JSON.stringify(interval)}
      />
      <IntervalTimerConfiguration interval={interval} t={t} />
    </Box>
  );
}
