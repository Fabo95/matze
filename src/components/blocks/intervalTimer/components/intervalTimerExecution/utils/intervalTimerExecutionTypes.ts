import { ApplicationProcessMachine } from '@Interval/components/blocks/intervalTimer/intervalTimerExecutionMachine/IntervalTimerExecutionMachine';

export type IntervalTimerExecutionBackgroundGradientStrategy = {
  isCurrentState: (
    intervalTimerExecutionStateValue: ApplicationProcessMachine['value']
  ) => boolean;
  setBackGroundGradient: () => void;
};
