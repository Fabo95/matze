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

export type IntervalTimerDetailProps = {
  configurationOptionsProps: IntervalTimerConfigurationOptionProps[];
  executionOverviewButtonProps: IntervalTimerExecutionOverviewButtonProps[];
  primaryButtonTitle: string;
  timeLeft: string;
};

export const IntervalTimerDetail = ({
  configurationOptionsProps,
  executionOverviewButtonProps,
  primaryButtonTitle,
  timeLeft,
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
    <Box className="interval-timer-detail">
      {/* This box styling enables circle cut off of the interval timer detail box. */}
      <Box className="interval-timer-detail-circle-cut-off" />
      <Swiper autoSwipe={autoSwipe}>
        <IntervalTimerDetailConfigurationOptions
          configurationOptionsProps={configurationOptionsProps}
          primaryButtonTitle={primaryButtonTitle}
        />

        <IntervalTimerDetailExecutionOverview
          executionOverviewButtonProps={executionOverviewButtonProps}
          timeLeft={timeLeft}
        />
      </Swiper>
    </Box>
  );
};
