'use client';

import { Box } from 'common/box';
import {
  IntervalTimerConfigurationOptionProps,
  IntervalTimerExecutionOverviewButtonProps,
} from 'ui/intervalTimer/utils/intervalTimerTypes';
import { Swiper } from 'common/Swiper/swiper';
import { IntervalTimerDetailConfigurationOptions } from 'ui/intervalTimer/IntervalTimerConfiguration/components/IntervalTimerDetailConfigurationOptions/intervalTimerDetailConfigurationOptions';
import { IntervalTimerDetailExecutionOverview } from 'ui/intervalTimer/IntervalTimerConfiguration/components/IntervalTimerDetailExecutionOverview/intervalTimerDetailExecutionOverview';

export type IntervalTimerDetailProps = {
  configurationOptionsProps: IntervalTimerConfigurationOptionProps[];
  executionOverviewButtonProps: IntervalTimerExecutionOverviewButtonProps[];
  primaryButtonTitle: string;
};

export const IntervalTimerDetail = ({
  configurationOptionsProps,
  executionOverviewButtonProps,
  primaryButtonTitle,
}: IntervalTimerDetailProps) => (
  <Box className="interval-timer-detail">
    {/* This box styling enables circle cut off of the interval timer detail box. */}
    <Box className="interval-timer-detail-circle-cut-off" />
    <Swiper>
      <IntervalTimerDetailConfigurationOptions
        configurationOptionsProps={configurationOptionsProps}
        primaryButtonTitle={primaryButtonTitle}
      />

      <IntervalTimerDetailExecutionOverview
        executionOverviewButtonProps={executionOverviewButtonProps}
      />
    </Swiper>
  </Box>
);
