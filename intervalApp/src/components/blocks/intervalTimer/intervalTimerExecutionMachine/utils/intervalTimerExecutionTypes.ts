import { Observable } from 'rxjs';

export type IntervalTimerExecutionMachineContext = {
  exerciseCount: { remaining: number; total: number };
  isExecuting: boolean;
  remainingCurrentTime: number;
  remainingTotalTime: number;
  restTime: number;
  roundCount: { remaining: number; total: number };
  roundResetTime: number;
  wakeLockSentinel?: WakeLockSentinel;
  workTime: number;
};

export type IntervalTimerExecutionMachineEvents =
  | { type: 'DECREASE_CURRENT_TIME' }
  | { type: 'DECREASE_TOTAL_TIME' }
  | { type: 'START_EXECUTION' }
  | { type: 'PAUSE_EXECUTION' }
  | { type: 'STOP_EXECUTION' };

export type IntervalTimerExecutionMachineServices = {
  releaseWakeLockSentinel: {
    data: undefined;
  };
  requestWakeLockSentinel: {
    data: WakeLockSentinel | undefined;
  };
};

export enum State {
  COMPLETE = 'complete',
  IDLE = 'idle',
  INIT_WAKE_LOCK = 'initWakeLock',
  REST_TIME = 'restTime',
  REST_TIME_DONE = 'restTimeDone',
  ROUND_RESET_TIME = 'roundResetTime',
  ROUND_RESET_TIME_DONE = 'roundResetTimeDone',
  WORK_TIME = 'workTime',
  WORK_TIME_DONE = 'workTimeDone',
}
