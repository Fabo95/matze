import React from 'react';

import { getTFunction } from 'i18n/get-t-function';
import { Locale } from 'utils/types';
import { apiGetInterval } from 'api/api';
import { Box } from 'common/box';
import { getIntervalTimerConfigurationOptionsProps } from 'ui/intervalTimer/utils/intervalTimerHelpers';
import { IntervalTimer } from 'ui/intervalTimer/intervalTimer';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = await getTFunction(lang);

  // --- DATA ---

  const interval = await apiGetInterval();

  // --- STATE ---

  const configurationOptionsProps = getIntervalTimerConfigurationOptionsProps({
    interval,
    t,
  });

  const primaryButtonTitle = t('cta.confirm');

  // --- RENDER ---

  return (
    <Box className="home-page">
      <IntervalTimer
        configurationOptionsProps={configurationOptionsProps}
        interval={interval}
        primaryButtonTitle={primaryButtonTitle}
      />
    </Box>
  );
}
