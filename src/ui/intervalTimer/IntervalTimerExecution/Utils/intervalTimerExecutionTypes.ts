import { ApplicationProcessMachine } from 'ui/intervalTimer/IntervalTimerExecutionMachine/IntervalTimerExecutionMachine';

export type IntervalTimerExecutionBackgroundGradientStrategy = {
  isCurrentState: (
    intervalTimerExecutionStateValue: ApplicationProcessMachine['value']
  ) => boolean;
  setBackGroundGradient: () => void;
};
