import { Interval } from 'api/utils/apiTypes';

export type IntervalTimerExecutionMachineContext = Omit<Interval, 'userId'> & {
  isAutoExecution: boolean;
};

export type IntervalTimerExecutionMachineEvents =
  | { type: 'STOP_EXECUTION' }
  | { type: 'DECREASE_WORK_TIME' }
  | { type: 'DECREASE_REST_TIME' }
  | { type: 'DECREASE_ROUND_RESET_TIME' };
