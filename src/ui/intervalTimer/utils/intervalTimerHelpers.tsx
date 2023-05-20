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
  className: { button: string; modal: string };
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
      button: 'work-time-configuration-button',
      modal: 'background-green-dark',
    },
    configurationType: IntervalTimerConfigurationType.TIME,
    icon: <PlayCircleIcon className="margin-right-0-5 stroke-green-dark" />,
    intensity: interval.workTime,
    intensityType: IntervalTimerIntensityType.WORK_TIME,
    sliderRange: { from: 5, to: 180 },
    title: t('pages.home.intervalTimer.optionOne'),
  },
  {
    className: {
      button: 'rest-time-configuration-button',
      modal: 'background-red-dark',
    },
    configurationType: IntervalTimerConfigurationType.TIME,
    icon: <PauseCircleIcon className="margin-right-0-5 stroke-red-dark" />,
    intensity: interval.restTime,
    intensityType: IntervalTimerIntensityType.REST_TIME,
    sliderRange: { from: 0, to: 180 },
    title: t('pages.home.intervalTimer.optionTwo'),
  },
  {
    className: {
      button: 'exercise-count-configuration-button',
      modal: 'background-gray-dark',
    },
    configurationType: IntervalTimerConfigurationType.COUNT,
    icon: <RocketIcon className="margin-right-0-5 stroke-gray-dark" />,
    intensity: interval.exerciseCount,
    intensityType: IntervalTimerIntensityType.EXERCISE_COUNT,
    sliderRange: { from: 1, to: 20 },
    title: t('pages.home.intervalTimer.optionThree'),
  },
  {
    className: {
      button: 'round-count-configuration-button',
      modal: 'background-blue-dark',
    },
    configurationType: IntervalTimerConfigurationType.COUNT,
    icon: <RepeatIcon className="margin-right-0-5 stroke-blue-dark" />,
    intensity: interval.roundCount,
    intensityType: IntervalTimerIntensityType.ROUND_COUNT,
    sliderRange: { from: 1, to: 25 },
    title: t('pages.home.intervalTimer.optionFour'),
  },
  {
    className: {
      button: 'round-reset-time-configuration-button',
      modal: 'background-yellow-dark',
    },
    configurationType: IntervalTimerConfigurationType.TIME,
    icon: <StopCircleIcon className="margin-right-0-5 stroke-yellow-dark" />,
    intensity: interval.roundResetTime,
    intensityType: IntervalTimerIntensityType.ROUND_RESET_TIME,
    sliderRange: { from: 0, to: 180 },
    title: t('pages.home.intervalTimer.optionFive'),
  },
];
