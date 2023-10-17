'use client';

import { useMemo } from 'react';

import { Box } from 'core/box';
import {
  IntervalTimerConfigurationOptionProps,
  IntervalTimerExecutionOverviewButtonProps,
} from 'ui/home/components/utils/intervalTimerTypes';
import { Swiper } from 'core/swiper/swiper';
import { IntervalTimerDetailConfigurationOptions } from 'ui/home/components/intervalTimerDetail/components/IntervalTimerDetailConfigurationOptions/intervalTimerDetailConfigurationOptions';
import { IntervalTimerDetailExecutionOverview } from 'ui/home/components/intervalTimerDetail/components/IntervalTimerDetailExecutionOverview/intervalTimerDetailExecutionOverview';
import { useSelector } from 'ui/home/intervalTimerExecutionMachineContext/intervalTimerExecutionMachineContext';
import { selectIsExecuting } from 'ui/home/intervalTimerExecutionMachineContext/utils/intervalTimerExecutionMachineSelectors';
import { PageBlockEnd } from 'core/page/components/pageBlockEnd';

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
