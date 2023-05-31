export type IntervalTimerExecutionMachineContext = {
  isAutoExecution: boolean;
  remainingCurrentTime: number;
  remainingTotalTime: number;
  isExecuting: boolean;
  workTime: number;
  restTime: number;
  remainingExerciseCount: number;
  remainingRoundCount: number;
  roundResetTime: number;
};

export type IntervalTimerExecutionMachineEvents =
  | { type: 'DECREASE_CURRENT_TIME' }
  | { type: 'DECREASE_TOTAL_TIME' }
  | { type: 'START_EXECUTION' }
  | { type: 'PAUSE_EXECUTION' }
  | { type: 'STOP_EXECUTION' };
