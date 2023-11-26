'use client';

import { useMemo } from 'react';

import { IntervalTimerDetailConfigurationOptions } from '@Interval/components/blocks/intervalTimer/components/intervalTimerDetail/components/IntervalTimerDetailConfigurationOptions/intervalTimerDetailConfigurationOptions';
import { IntervalTimerDetailExecutionOverview } from '@Interval/components/blocks/intervalTimer/components/intervalTimerDetail/components/IntervalTimerDetailExecutionOverview/intervalTimerDetailExecutionOverview';
import {
  IntervalTimerConfigurationOptionProps,
  IntervalTimerExecutionOverviewButtonProps,
} from '@Interval/components/blocks/intervalTimer/components/utils/intervalTimerTypes';
import { useSelector } from '@Interval/components/blocks/intervalTimer/intervalTimerExecutionMachineContext/intervalTimerExecutionMachineContext';
import { selectIsExecuting } from '@Interval/components/blocks/intervalTimer/intervalTimerExecutionMachineContext/utils/intervalTimerExecutionMachineSelectors';
import { Box } from '@Interval/components/core/box';
import { PageBlockEnd } from '@Interval/components/core/page/components/pageBlockEnd';
import { Swiper } from '@Interval/components/core/swiper/swiper';

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
    [isExecuting],
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
