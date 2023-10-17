import React from 'react';

import { getTFunction } from 'i18n/tFunction';
import { Locale } from 'utils/types';
import { apiGetInterval } from 'api/api';
import {
  getIntervalTimerConfigurationOptionsProps,
  getIntervalTimerExecutionOverviewButtonProps,
} from 'ui/home/components/utils/intervalTimerHelpers';
import { IntervalTimer } from 'ui/home/components/intervalTimer';
import { Page } from 'core/page/page';

type HomeProps = {
  params: { lang: Locale };
};

export default async function Home({ params: { lang } }: HomeProps) {
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
