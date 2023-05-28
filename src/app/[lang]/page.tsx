import React from 'react';

import { getTFunction } from 'i18n/get-t-function';
import { Locale } from 'utils/types';
import { IntervalTimerConfiguration } from 'ui/intervalTimer/IntervalTimerConfiguration/intervalTimerConfiguration';
import { IntervalTimerExecution } from 'ui/intervalTimer/IntervalTimerExecution/intervalTimerExecution';
import { apiGetInterval } from 'api/api';
import { Box } from 'common/box';
import { getIntervalTimerConfigurationOptionsProps } from 'ui/intervalTimer/utils/intervalTimerHelpers';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = await getTFunction(lang);

  // --- DATA ---

  const interval = await apiGetInterval();

  // --- HELPERS ---

  const configurationOptionsProps = getIntervalTimerConfigurationOptionsProps({
    interval,
    t,
  });

  const primaryButtonTitle = t('cta.confirm');

  // --- RENDER ---

  return (
    <Box className="home-page">
      <IntervalTimerExecution
        interval={interval}
        key={JSON.stringify(interval)}
      />
      <IntervalTimerConfiguration
        configurationOptionsProps={configurationOptionsProps}
        primaryButtonTitle={primaryButtonTitle}
      />
    </Box>
  );
}
