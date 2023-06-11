import { ReactElement } from 'react';
import { IntervalIntensityType } from 'api/utils/apiTypes';

export enum IntervalTimerConfigurationType {
  COUNT = 'count',
  TIME = 'time',
}

export type IntervalTimerExecutionOverviewButtonProps = {
  icon: ReactElement;
  intensityType:
    | IntervalIntensityType.ROUND_COUNT
    | IntervalIntensityType.EXERCISE_COUNT;
  title: string;
  className: { detailButton: string; modalContainer: string };
};

export type IntervalTimerConfigurationOptionProps = Omit<
  IntervalTimerExecutionOverviewButtonProps,
  'intensityType'
> & {
  intensity: number;
  intensityType: Exclude<IntervalIntensityType, IntervalIntensityType.USER_ID>;
  configurationType: IntervalTimerConfigurationType;
  sliderRange: { from: number; to: number };
};
