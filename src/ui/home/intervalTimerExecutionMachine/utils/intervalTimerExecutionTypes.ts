import { Observable } from 'rxjs';

export type IntervalTimerExecutionMachineContext = {
  wakeLockSentinel?: WakeLockSentinel;
  exerciseCount: { total: number; remaining: number };
  remainingCurrentTime: number;
  remainingTotalTime: number;
  isExecuting: boolean;
  workTime: number;
  restTime: number;
  roundResetTime: number;
  roundCount: { total: number; remaining: number };
};

export type IntervalTimerExecutionMachineEvents =
  | { type: 'DECREASE_CURRENT_TIME' }
  | { type: 'DECREASE_TOTAL_TIME' }
  | { type: 'START_EXECUTION' }
  | { type: 'PAUSE_EXECUTION' }
  | { type: 'STOP_EXECUTION' };

export type IntervalTimerExecutionMachineServices = {
  requestWakeLockSentinel: {
    data: WakeLockSentinel | undefined;
  };
  releaseWakeLockSentinel: {
    data: undefined;
  };
};

export enum State {
  IDLE = 'idle',
  COMPLETE = 'complete',
  WORK_TIME = 'workTime',
  REST_TIME = 'restTime',
  ROUND_RESET_TIME = 'roundResetTime',
  WORK_TIME_DONE = 'workTimeDone',
  REST_TIME_DONE = 'restTimeDone',
  ROUND_RESET_TIME_DONE = 'roundResetTimeDone',
  INIT_WAKE_LOCK = 'initWakeLock',
}
