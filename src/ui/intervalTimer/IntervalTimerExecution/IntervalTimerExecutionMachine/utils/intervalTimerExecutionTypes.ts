import { Interval } from 'api/utils/apiTypes';

export type IntervalTimerExecutionMachineContext = Omit<Interval, 'userId'> & {
  isAutoExecution: boolean;
  intervalTime: number;
  totalTime: number;
};

export type IntervalTimerExecutionMachineEvents =
  | { type: 'STOP_EXECUTION' }
  | { type: 'DECREASE_INTERVAL_TIME' }
  | { type: 'DECREASE_TOTAL_TIME' };
