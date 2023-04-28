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
  className: string;
  icon: ReactElement;
  intensity: string | number;
  title: string;
};
export const getIntervalTimerSettingOptions = ({
  t,
  interval,
}: {
  interval: Interval;
  t: TFunction;
}): IntervalTimerSettingOptionProps[] => [
  {
    className: 'text-green-dark bg-green-light',
    icon: <PlayIcon className="mr-2 stroke-green-dark" />,
    intensity: getFormattedSecondsToMinutes(interval.workTime),
    title: t('pages.home.intervalTimer.optionOne'),
  },
  {
    className: 'text-red-primary bg-red-op-5',
    icon: <PauseIcon className="mr-2 stroke-red-primary" />,
    intensity: getFormattedSecondsToMinutes(interval.restTime),
    title: t('pages.home.intervalTimer.optionTwo'),
  },
  {
    className: 'text-gray-dark bg-gray-light',
    icon: <RocketIcon className="mr-2 stroke-gray-dark" />,
    intensity: interval.exerciseCount,
    title: t('pages.home.intervalTimer.optionThree'),
  },
  {
    className: 'text-blue-dark bg-blue-light',
    icon: <RepeatIcon className="mr-2 stroke-blue-dark" />,
    intensity: interval.roundCount,
    title: t('pages.home.intervalTimer.optionFour'),
  },
  {
    className: 'text-yellow-dark bg-yellow-light',
    icon: <StopIcon className="mr-2 stroke-yellow-dark" />,
    intensity: getFormattedSecondsToMinutes(interval.roundResetTime),
    title: t('pages.home.intervalTimer.optionFive'),
  },
];
