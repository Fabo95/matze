import { TFunction } from 'utils/types';
import { Interval } from 'app/[lang]/page';

export const getIntervalTimerSettingOptions = ({
  t,
  interval,
}: {
  interval: Interval;
  t: TFunction;
}) => [
  {
    className: '',
    icon: '',
    intensity: interval.workTime,
    title: t('pages.home.intervalTimer.optionOne'),
  },
  {
    className: '',
    icon: '',
    intensity: interval.restTime,
    title: t('pages.home.intervalTimer.optionTwo'),
  },
  {
    className: '',
    icon: '',
    intensity: interval.exerciseCount,
    title: t('pages.home.intervalTimer.optionThree'),
  },
  {
    className: '',
    icon: '',
    intensity: interval.roundCount,
    title: t('pages.home.intervalTimer.optionFour'),
  },
  {
    className: '',
    icon: '',
    intensity: interval.roundResetTime,
    title: t('pages.home.intervalTimer.optionFive'),
  },
];
