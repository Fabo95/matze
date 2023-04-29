import { ReactElement } from 'react';

import { TFunction } from 'utils/types';
import { Interval } from 'app/[lang]/page';
import { PlayIcon } from 'icons/playIcon';
import { PauseIcon } from 'icons/pauseIcon';
import { RocketIcon } from 'icons/rocketIcon';
import { RepeatIcon } from 'icons/repeatIcon';
import { StopIcon } from 'icons/stopIcon';
import { getFormattedSecondsToMinutes } from 'utils/helpers';

export type IntervalTimerSettingOptionProps = {
  className: { button: string; modal: string };
  icon: ReactElement;
  intensity: number;
  title: string;
};
export const getIntervalTimerSettingOptionsProps = ({
  t,
  interval,
}: {
  interval: Interval;
  t: TFunction;
}): IntervalTimerSettingOptionProps[] => [
  {
    className: {
      button: 'text-green-dark bg-green-light',
      modal: 'bg-green-dark',
    },
    icon: <PlayIcon className="mr-2 stroke-green-dark" />,
    intensity: interval.workTime,
    title: t('pages.home.intervalTimer.optionOne'),
  },
  {
    className: {
      button: 'text-red-dark bg-red-light',
      modal: 'bg-red-dark',
    },
    icon: <PauseIcon className="mr-2 stroke-red-dark" />,
    intensity: interval.restTime,
    title: t('pages.home.intervalTimer.optionTwo'),
  },
  {
    className: {
      button: 'text-gray-dark bg-gray-light',
      modal: 'bg-gray-dark',
    },
    icon: <RocketIcon className="mr-2 stroke-gray-dark" />,
    intensity: interval.exerciseCount,
    title: t('pages.home.intervalTimer.optionThree'),
  },
  {
    className: {
      button: 'text-blue-dark bg-blue-light',
      modal: 'bg-blue-dark',
    },
    icon: <RepeatIcon className="mr-2 stroke-blue-dark" />,
    intensity: interval.roundCount,
    title: t('pages.home.intervalTimer.optionFour'),
  },
  {
    className: {
      button: 'text-yellow-dark bg-yellow-light',
      modal: 'bg-yellow-dark',
    },
    icon: <StopIcon className="mr-2 stroke-yellow-dark" />,
    intensity: interval.roundResetTime,
    title: t('pages.home.intervalTimer.optionFive'),
  },
];
