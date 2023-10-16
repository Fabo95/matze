import React from 'react';

import { getTFunction } from 'i18n/tFunction';
import { Locale } from 'utils/types';
import { apiGetInterval } from 'api/api';
import {
  getIntervalTimerConfigurationOptionsProps,
  getIntervalTimerExecutionOverviewButtonProps,
} from 'ui/intervalTimer/utils/intervalTimerHelpers';
import { IntervalTimer } from 'ui/intervalTimer/intervalTimer';
import { Page } from 'common/Page/page';

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

  const executionOverviewButtonProps =
    getIntervalTimerExecutionOverviewButtonProps(t);

  // --- RENDER ---

  return (
    <Page>
      <IntervalTimer
        configurationOptionsProps={configurationOptionsProps}
        executionOverviewButtonProps={executionOverviewButtonProps}
        interval={interval}
        key={JSON.stringify(interval)}
      />
    </Page>
  );
}
