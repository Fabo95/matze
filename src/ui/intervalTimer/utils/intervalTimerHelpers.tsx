import { ReactElement } from 'react';

import { TFunction } from 'utils/types';
import { Interval } from 'app/[lang]/page';
import { PlayIcon } from 'icons/playIcon';
import { PauseIcon } from 'icons/pauseIcon';
import { RocketIcon } from 'icons/rocketIcon';
import { RepeatIcon } from 'icons/repeatIcon';
import { StopIcon } from 'icons/stopIcon';
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
      button: 'text-green-dark bg-green-light',
      modal: 'bg-green-dark',
    },
    configurationType: IntervalTimerConfigurationType.TIME,
    icon: <PlayIcon className="mr-2 stroke-green-dark" />,
    intensity: interval.workTime,
    intensityType: IntervalTimerIntensityType.WORK_TIME,
    sliderRange: { from: 5, to: 180 },
    title: t('pages.home.intervalTimer.optionOne'),
  },
  {
    className: {
      button: 'text-red-dark bg-red-light',
      modal: 'bg-red-dark',
    },
    configurationType: IntervalTimerConfigurationType.TIME,
    icon: <PauseIcon className="mr-2 stroke-red-dark" />,
    intensity: interval.restTime,
    intensityType: IntervalTimerIntensityType.REST_TIME,
    sliderRange: { from: 0, to: 180 },
    title: t('pages.home.intervalTimer.optionTwo'),
  },
  {
    className: {
      button: 'text-gray-dark bg-gray-light',
      modal: 'bg-gray-dark',
    },
    configurationType: IntervalTimerConfigurationType.COUNT,
    icon: <RocketIcon className="mr-2 stroke-gray-dark" />,
    intensity: interval.exerciseCount,
    intensityType: IntervalTimerIntensityType.EXERCISE_COUNT,
    sliderRange: { from: 1, to: 20 },
    title: t('pages.home.intervalTimer.optionThree'),
  },
  {
    className: {
      button: 'text-blue-dark bg-blue-light',
      modal: 'bg-blue-dark',
    },
    configurationType: IntervalTimerConfigurationType.COUNT,
    icon: <RepeatIcon className="mr-2 stroke-blue-dark" />,
    intensity: interval.roundCount,
    intensityType: IntervalTimerIntensityType.ROUND_COUNT,
    sliderRange: { from: 1, to: 25 },
    title: t('pages.home.intervalTimer.optionFour'),
  },
  {
    className: {
      button: 'text-yellow-dark bg-yellow-light',
      modal: 'bg-yellow-dark',
    },
    configurationType: IntervalTimerConfigurationType.TIME,
    icon: <StopIcon className="mr-2 stroke-yellow-dark" />,
    intensity: interval.roundResetTime,
    intensityType: IntervalTimerIntensityType.ROUND_RESET_TIME,
    sliderRange: { from: 0, to: 180 },
    title: t('pages.home.intervalTimer.optionFive'),
  },
];
