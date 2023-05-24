import { ReactElement } from 'react';

import { TFunction } from 'utils/types';
import { Interval } from 'api/utils/apiTypes';
import { PlayCircleIcon } from 'icons/playCircleIcon';
import { PauseCircleIcon } from 'icons/pauseCircleIcon';
import { RocketIcon } from 'icons/rocketIcon';
import { RepeatIcon } from 'icons/repeatIcon';
import { StopCircleIcon } from 'icons/stopCircleIcon';
import {
  IntervalTimerConfigurationType,
  IntervalTimerIntensityType,
} from 'ui/intervalTimer/utils/intervalTimerTypes';

export type IntervalTimerConfigurationOptionProps = {
  className: { configurationOptionButton: string; modalContainer: string };
  icon: ReactElement;
  intensity: number;
  intensityType: IntervalTimerIntensityType;
  title: string;
  configurationType: IntervalTimerConfigurationType;
  sliderRange: { from: number; to: number };
};
export const getIntervalTimerConfigurationOptionsProps = ({
  t,
  interval,
}: {
  interval: Interval;
  t: TFunction;
}): IntervalTimerConfigurationOptionProps[] => [
  {
    className: {
      configurationOptionButton: 'configuration-option-button-work-time',
      modalContainer: 'background-green-dark',
    },
    configurationType: IntervalTimerConfigurationType.TIME,
    icon: <PlayCircleIcon className="stroke-green-dark" />,
    intensity: interval.workTime,
    intensityType: IntervalTimerIntensityType.WORK_TIME,
    sliderRange: { from: 5, to: 180 },
    title: t('pages.home.intervalTimer.optionOne'),
  },
  {
    className: {
      configurationOptionButton: 'configuration-option-button-rest-time',
      modalContainer: 'background-red-dark',
    },
    configurationType: IntervalTimerConfigurationType.TIME,
    icon: <PauseCircleIcon className="stroke-red-dark" />,
    intensity: interval.restTime,
    intensityType: IntervalTimerIntensityType.REST_TIME,
    sliderRange: { from: 0, to: 180 },
    title: t('pages.home.intervalTimer.optionTwo'),
  },
  {
    className: {
      configurationOptionButton: 'configuration-option-button-exercise-count',
      modalContainer: 'background-gray-dark',
    },
    configurationType: IntervalTimerConfigurationType.COUNT,
    icon: <RocketIcon className="stroke-gray-dark" />,
    intensity: interval.exerciseCount,
    intensityType: IntervalTimerIntensityType.EXERCISE_COUNT,
    sliderRange: { from: 1, to: 20 },
    title: t('pages.home.intervalTimer.optionThree'),
  },
  {
    className: {
      configurationOptionButton: 'configuration-option-button-round-count',
      modalContainer: 'background-blue-dark',
    },
    configurationType: IntervalTimerConfigurationType.COUNT,
    icon: <RepeatIcon className="stroke-blue-dark" />,
    intensity: interval.roundCount,
    intensityType: IntervalTimerIntensityType.ROUND_COUNT,
    sliderRange: { from: 1, to: 25 },
    title: t('pages.home.intervalTimer.optionFour'),
  },
  {
    className: {
      configurationOptionButton: 'configuration-option-button-round-reset-time',
      modalContainer: 'background-yellow-dark',
    },
    configurationType: IntervalTimerConfigurationType.TIME,
    icon: <StopCircleIcon className="stroke-yellow-dark" />,
    intensity: interval.roundResetTime,
    intensityType: IntervalTimerIntensityType.ROUND_RESET_TIME,
    sliderRange: { from: 0, to: 180 },
    title: t('pages.home.intervalTimer.optionFive'),
  },
];
