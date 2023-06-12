export type IntervalTimerExecutionMachineContext = {
  exerciseCount: { total: number; remaining: number };
  isAutoExecution: boolean;
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

export enum State {
  IDLE = 'idle',
  WORK_TIME_STATE = 'workTimeState',
  REST_TIME_STATE = 'restTimeState',
  ROUND_RESET_TIME_STATE = 'roundResetTimeState',
}
