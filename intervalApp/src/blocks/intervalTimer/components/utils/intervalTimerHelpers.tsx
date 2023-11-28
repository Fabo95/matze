import { Interval, IntervalIntensityType } from '@Interval/api/utils/apiTypes';
import {
  IntervalTimerConfigurationOptionProps,
  IntervalTimerConfigurationType,
  IntervalTimerExecutionOverviewButtonProps,
} from '@Interval/blocks/intervalTimer/components/utils/intervalTimerTypes';
import { PauseCircleIcon } from '@Interval/components/icons/pauseCircleIcon';
import { PlayCircleIcon } from '@Interval/components/icons/playCircleIcon';
import { RepeatIcon } from '@Interval/components/icons/repeatIcon';
import { RocketIcon } from '@Interval/components/icons/rocketIcon';
import { StopCircleIcon } from '@Interval/components/icons/stopCircleIcon';
import { TFunction } from '@Interval/utils/types';

const getIntervalTimerExecutionExerciseCountButtonProps = (
  t: TFunction,
): IntervalTimerExecutionOverviewButtonProps => ({
  className: {
    detailButton: 'detail-button-exercise-count',
    modalContainer: 'background-gray-dark',
    overviewDot: 'overview-dot-exercise-count',
  },
  icon: <RocketIcon className="stroke-gray-dark" />,
  intensityType: IntervalIntensityType.EXERCISE_COUNT,
  title: t('pages.home.intervalTimer.optionThree'),
});

const getIntervalTimerExecutionRoundCountButtonProps = (
  t: TFunction,
): IntervalTimerExecutionOverviewButtonProps => ({
  className: {
    detailButton: 'detail-button-round-count',
    modalContainer: 'background-blue-dark',
    overviewDot: 'overview-dot-round-count',
  },
  icon: <RepeatIcon className="stroke-blue-dark" />,
  intensityType: IntervalIntensityType.ROUND_COUNT,
  title: t('pages.home.intervalTimer.optionFour'),
});

export const getIntervalTimerConfigurationOptionsProps = ({
  interval,
  t,
}: {
  interval: Interval;
  t: TFunction;
}): IntervalTimerConfigurationOptionProps[] => [
  {
    className: {
      detailButton: 'detail-button-work-time',
      modalContainer: 'background-green-dark',
    },
    configurationType: IntervalTimerConfigurationType.TIME,
    icon: <PlayCircleIcon className="stroke-green-dark" />,
    intensity: interval.workTime,
    intensityType: IntervalIntensityType.WORK_TIME,
    sliderRange: { from: 5, to: 180 },
    title: t('pages.home.intervalTimer.optionOne'),
  },
  {
    className: {
      detailButton: 'detail-button-rest-time',
      modalContainer: 'background-red-dark',
    },
    configurationType: IntervalTimerConfigurationType.TIME,
    icon: <PauseCircleIcon className="stroke-red-dark" />,
    intensity: interval.restTime,
    intensityType: IntervalIntensityType.REST_TIME,
    sliderRange: { from: 0, to: 180 },
    title: t('pages.home.intervalTimer.optionTwo'),
  },
  {
    ...getIntervalTimerExecutionExerciseCountButtonProps(t),
    configurationType: IntervalTimerConfigurationType.COUNT,
    intensity: interval.exerciseCount,
    sliderRange: { from: 1, to: 20 },
  },
  {
    ...getIntervalTimerExecutionRoundCountButtonProps(t),
    configurationType: IntervalTimerConfigurationType.COUNT,
    intensity: interval.roundCount,
    sliderRange: { from: 1, to: 25 },
  },
  {
    className: {
      detailButton: 'detail-button-round-reset-time',
      modalContainer: 'background-yellow-dark',
    },
    configurationType: IntervalTimerConfigurationType.TIME,
    icon: <StopCircleIcon className="stroke-yellow-dark" />,
    intensity: interval.roundResetTime,
    intensityType: IntervalIntensityType.ROUND_RESET_TIME,
    sliderRange: { from: 0, to: 180 },
    title: t('pages.home.intervalTimer.optionFive'),
  },
];

export const getIntervalTimerExecutionOverviewButtonProps = (
  t: TFunction,
): IntervalTimerExecutionOverviewButtonProps[] => [
  getIntervalTimerExecutionExerciseCountButtonProps(t),
  getIntervalTimerExecutionRoundCountButtonProps(t),
];
