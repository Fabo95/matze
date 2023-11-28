import {
  getIntervalTimerConfigurationOptionsProps,
  getIntervalTimerExecutionOverviewButtonProps,
} from '@Interval/blocks/intervalTimer/components/utils/intervalTimerHelpers';
import { IntervalTimerBlock } from '@Interval/blocks/intervalTimer/intervalTimerBlock';
import { Page } from '@Interval/components/core/page/page';
import { getTFunction } from '@Interval/i18n/tFunction';
import { apiGetInterval } from '@Interval/api/api';
import { Locale } from '@Interval/utils/types';

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
      <IntervalTimerBlock
        configurationOptionsProps={configurationOptionsProps}
        executionOverviewButtonProps={executionOverviewButtonProps}
        interval={interval}
        key={JSON.stringify(interval)}
      />
    </Page>
  );
}
