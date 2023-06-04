'use client';

import { Box } from 'common/box';
import { IntervalTimerConfigurationOptionProps } from 'ui/intervalTimer/utils/intervalTimerHelpers';
import { Swiper } from 'common/Swiper/swiper';
import { IntervalTimerDetailConfigurationOptions } from 'ui/intervalTimer/IntervalTimerConfiguration/components/IntervalTimerDetailConfigurationOptions/intervalTimerDetailConfigurationOptions';
import { IntervalTimerDetailExecutionOverview } from 'ui/intervalTimer/IntervalTimerConfiguration/components/IntervalTimerDetailExecutionOverview/intervalTimerDetailExecutionOverview';

export type IntervalTimerDetailProps = {
  currentRound: number;
  currentExercise: number;
  totalRoundCount: number;
  totalExerciseCount: number;
  configurationOptionsProps: IntervalTimerConfigurationOptionProps[];
  primaryButtonTitle: string;
  remainingTotalTime: number;
};

export const IntervalTimerDetail = ({
  currentRound,
  currentExercise,
  totalRoundCount,
  totalExerciseCount,
  configurationOptionsProps,
  primaryButtonTitle,
  remainingTotalTime,
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
        currentExercise={currentExercise}
        currentRound={currentRound}
        remainingTotalTime={remainingTotalTime}
        totalExerciseCount={totalExerciseCount}
        totalRoundCount={totalRoundCount}
      />
    </Swiper>
  </Box>
);
