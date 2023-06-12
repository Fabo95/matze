import { ApplicationProcessMachine } from 'ui/intervalTimer/IntervalTimerExecutionMachine/IntervalTimerExecutionMachine';
import { State } from 'ui/intervalTimer/IntervalTimerExecutionMachine/utils/intervalTimerExecutionTypes';
import { IntervalTimerExecutionBackgroundGradientStrategy } from 'ui/intervalTimer/IntervalTimerExecution/Utils/intervalTimerExecutionTypes';

export const getIntervalTimerExecutionBackgroundGradientStrategies =
  (): IntervalTimerExecutionBackgroundGradientStrategy[] => [
    {
      isCurrentState: (intervalTimerExecutionStateValue) =>
        intervalTimerExecutionStateValue === State.WORK_TIME_STATE,
      setBackGroundGradient: () => {
        document.body.className = '';
        document.body.classList.add('work-time-background-gradient');
      },
    },
    {
      isCurrentState: (intervalTimerExecutionStateValue) =>
        intervalTimerExecutionStateValue === State.REST_TIME_STATE,
      setBackGroundGradient: () => {
        document.body.className = '';
        document.body.classList.add('rest-time-background-gradient');
      },
    },
    {
      isCurrentState: (intervalTimerExecutionStateValue) =>
        intervalTimerExecutionStateValue === State.ROUND_RESET_TIME_STATE,
      setBackGroundGradient: () => {
        document.body.className = '';
        document.body.classList.add('round-reset-time-background-gradient');
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
