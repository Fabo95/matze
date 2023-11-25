import { IntervalTimerExecutionBackgroundGradientStrategy } from '@Interval/components/blocks/intervalTimer/components/intervalTimerExecution/utils/intervalTimerExecutionTypes';
import { ApplicationProcessMachine } from '@Interval/components/blocks/intervalTimer/intervalTimerExecutionMachine/IntervalTimerExecutionMachine';
import { State } from '@Interval/components/blocks/intervalTimer/intervalTimerExecutionMachine/utils/intervalTimerExecutionTypes';

export const getIntervalTimerExecutionBackgroundGradientStrategies =
  (): IntervalTimerExecutionBackgroundGradientStrategy[] => [
    {
      isCurrentState: (intervalTimerExecutionStateValue) =>
        intervalTimerExecutionStateValue === State.WORK_TIME,
      setBackGroundGradient: () => {
        if (document.body.className === 'work-time-background-gradient') {
          return;
        }

        document.body.className = '';
        document.body.classList.add('work-time-background-gradient');
      },
    },
    {
      isCurrentState: (intervalTimerExecutionStateValue) =>
        intervalTimerExecutionStateValue === State.REST_TIME,
      setBackGroundGradient: () => {
        if (document.body.className === 'rest-time-background-gradient') {
          return;
        }

        document.body.className = '';
        document.body.classList.add('rest-time-background-gradient');
      },
    },
    {
      isCurrentState: (intervalTimerExecutionStateValue) =>
        intervalTimerExecutionStateValue === State.ROUND_RESET_TIME,
      setBackGroundGradient: () => {
        if (
          document.body.className === 'round-reset-time-background-gradient'
        ) {
          return;
        }

        document.body.className = '';
        document.body.classList.add('round-reset-time-background-gradient');
      },
    },
    {
      isCurrentState: (intervalTimerExecutionStateValue) =>
        intervalTimerExecutionStateValue === State.COMPLETE,
      setBackGroundGradient: () => {
        document.body.className = '';
      },
    },
  ];

export const executeIntervalTimerExecutionBackgroundGradientStrategy = ({
  backgroundGradientStrategy,
  intervalTimerExecutionStateValue,
}: {
  backgroundGradientStrategy: IntervalTimerExecutionBackgroundGradientStrategy;
  intervalTimerExecutionStateValue: ApplicationProcessMachine['value'];
}) => {
  if (
    backgroundGradientStrategy.isCurrentState(intervalTimerExecutionStateValue)
  ) {
    backgroundGradientStrategy.setBackGroundGradient();
  }
};
