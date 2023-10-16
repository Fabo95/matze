'use client';

import { useMemo } from 'react';

import { Box } from 'common/box';
import {
  IntervalTimerConfigurationOptionProps,
  IntervalTimerExecutionOverviewButtonProps,
} from 'ui/intervalTimer/utils/intervalTimerTypes';
import { Swiper } from 'common/Swiper/swiper';
import { IntervalTimerDetailConfigurationOptions } from 'ui/intervalTimer/IntervalTimerConfiguration/components/IntervalTimerDetailConfigurationOptions/intervalTimerDetailConfigurationOptions';
import { IntervalTimerDetailExecutionOverview } from 'ui/intervalTimer/IntervalTimerConfiguration/components/IntervalTimerDetailExecutionOverview/intervalTimerDetailExecutionOverview';
import { useSelector } from 'ui/intervalTimer/IntervalTimerExecutionMachineContext/intervalTimerExecutionMachineContext';
import { selectIsExecuting } from 'ui/intervalTimer/IntervalTimerExecutionMachineContext/Utils/intervalTimerExecutionMachineSelectors';
import { PageBlockEnd } from 'common/Page/components/pageBlockEnd';

export type IntervalTimerDetailProps = {
  configurationOptionsProps: IntervalTimerConfigurationOptionProps[];
  executionOverviewButtonProps: IntervalTimerExecutionOverviewButtonProps[];
};

export const IntervalTimerDetail = ({
  configurationOptionsProps,
  executionOverviewButtonProps,
}: IntervalTimerDetailProps) => {
  // --- STATE ---

  const isExecuting = useSelector(selectIsExecuting);

  // --- MEMOIZED DATA ---

  const autoSwipe = useMemo(
    () => ({ itemIndex: 1, shouldSwipe: isExecuting }),
    [isExecuting]
  );

  // --- RENDER ---

  return (
    <PageBlockEnd>
      {/* This box styling enables circle cut off of the interval timer detail box. */}
      <Box className="interval-timer-detail-circle-cut-off" />
      <Swiper autoSwipe={autoSwipe}>
        <IntervalTimerDetailConfigurationOptions
          configurationOptionsProps={configurationOptionsProps}
        />

        <IntervalTimerDetailExecutionOverview
          executionOverviewButtonProps={executionOverviewButtonProps}
        />
      </Swiper>
    </PageBlockEnd>
  );
};
