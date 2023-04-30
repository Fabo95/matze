import { ReactElement } from 'react';

import { TFunction } from 'utils/types';
import { Interval } from 'app/[lang]/page';
import { PlayIcon } from 'icons/playIcon';
import { PauseIcon } from 'icons/pauseIcon';
import { RocketIcon } from 'icons/rocketIcon';
import { RepeatIcon } from 'icons/repeatIcon';
import { StopIcon } from 'icons/stopIcon';
import { IntervalTimerConfigurationType } from 'ui/intervalTimer/utils/intervalTimerTypes';

export type IntervalTimerConfigurationOptionProps = {
  className: { button: string; modal: string };
  icon: ReactElement;
  intensity: number;
  title: string;
  type: IntervalTimerConfigurationType;
  range: { from: number; to: number };
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
    icon: <PlayIcon className="mr-2 stroke-green-dark" />,
    intensity: interval.workTime,
    range: { from: 5, to: 180 },
    title: t('pages.home.intervalTimer.optionOne'),
    type: IntervalTimerConfigurationType.TIME,
  },
  {
    className: {
      button: 'text-red-dark bg-red-light',
      modal: 'bg-red-dark',
    },
    icon: <PauseIcon className="mr-2 stroke-red-dark" />,
    intensity: interval.restTime,
    range: { from: 0, to: 60 },
    title: t('pages.home.intervalTimer.optionTwo'),
    type: IntervalTimerConfigurationType.TIME,
  },
  {
    className: {
      button: 'text-gray-dark bg-gray-light',
      modal: 'bg-gray-dark',
    },
    icon: <RocketIcon className="mr-2 stroke-gray-dark" />,
    intensity: interval.exerciseCount,
    range: { from: 0, to: 20 },
    title: t('pages.home.intervalTimer.optionThree'),
    type: IntervalTimerConfigurationType.COUNT,
  },
  {
    className: {
      button: 'text-blue-dark bg-blue-light',
      modal: 'bg-blue-dark',
    },
    icon: <RepeatIcon className="mr-2 stroke-blue-dark" />,
    intensity: interval.roundCount,
    range: { from: 1, to: 25 },
    title: t('pages.home.intervalTimer.optionFour'),
    type: IntervalTimerConfigurationType.COUNT,
  },
  {
    className: {
      button: 'text-yellow-dark bg-yellow-light',
      modal: 'bg-yellow-dark',
    },
    icon: <StopIcon className="mr-2 stroke-yellow-dark" />,
    intensity: interval.roundResetTime,
    range: { from: 0, to: 180 },
    title: t('pages.home.intervalTimer.optionFive'),
    type: IntervalTimerConfigurationType.TIME,
  },
];
