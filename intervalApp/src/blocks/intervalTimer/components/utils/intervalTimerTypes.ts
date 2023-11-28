import { ReactElement } from 'react';

import { IntervalIntensityType } from '@Interval/api/utils/apiTypes';

export enum IntervalTimerConfigurationType {
  COUNT = 'count',
  TIME = 'time',
}

export type IntervalTimerExecutionOverviewButtonProps = {
  className: {
    detailButton: string;
    modalContainer: string;
    overviewDot?: string;
  };
  icon: ReactElement;
  intensityType:
    | IntervalIntensityType.ROUND_COUNT
    | IntervalIntensityType.EXERCISE_COUNT;
  title: string;
};

export type IntervalTimerConfigurationOptionProps = Omit<
  IntervalTimerExecutionOverviewButtonProps,
  'intensityType'
> & {
  configurationType: IntervalTimerConfigurationType;
  intensity: number;
  intensityType: Exclude<IntervalIntensityType, IntervalIntensityType.USER_ID>;
  sliderRange: { from: number; to: number };
};
