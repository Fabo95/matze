import { ApplicationProcessMachine } from 'ui/home/intervalTimerExecutionMachine/IntervalTimerExecutionMachine';

export type IntervalTimerExecutionBackgroundGradientStrategy = {
  isCurrentState: (
    intervalTimerExecutionStateValue: ApplicationProcessMachine['value']
  ) => boolean;
  setBackGroundGradient: () => void;
};
