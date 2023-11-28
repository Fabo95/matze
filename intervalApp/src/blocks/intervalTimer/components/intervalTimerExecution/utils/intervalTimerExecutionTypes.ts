import { ApplicationProcessMachine } from '@Interval/blocks/intervalTimer/intervalTimerExecutionMachine/IntervalTimerExecutionMachine';

export type IntervalTimerExecutionBackgroundGradientStrategy = {
  isCurrentState: (
    intervalTimerExecutionStateValue: ApplicationProcessMachine['value'],
  ) => boolean;
  setBackGroundGradient: () => void;
};
