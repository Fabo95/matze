import { Interval } from 'api/utils/apiTypes';

export type IntervalTimerExecutionMachineContext = Omit<Interval, 'userId'> & {
  isAutoExecution: boolean;
  intervalTime: number;
  totalTime: number;
  isExecuting: boolean;
};

export type IntervalTimerExecutionMachineEvents =
  | { type: 'DECREASE_INTERVAL_TIME' }
  | { type: 'DECREASE_TOTAL_TIME' }
  | { type: 'START_EXECUTION' }
  | { type: 'PAUSE_EXECUTION' }
  | { type: 'STOP_EXECUTION' };
