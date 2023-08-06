// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    '': { type: '' };
    'done.invoke.intervalTimerExecutionMachine.complete:invocation[0]': {
      type: 'done.invoke.intervalTimerExecutionMachine.complete:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.intervalTimerExecutionMachine.initWakeLockSentinel:invocation[0]': {
      type: 'done.invoke.intervalTimerExecutionMachine.initWakeLockSentinel:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.intervalTimerExecutionMachine.workTime:invocation[0]': {
      type: 'done.invoke.intervalTimerExecutionMachine.workTime:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.intervalTimerExecutionMachine.initWakeLockSentinel:invocation[0]': {
      type: 'error.platform.intervalTimerExecutionMachine.initWakeLockSentinel:invocation[0]';
      data: unknown;
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    releaseWakeLockSentinel: 'done.invoke.intervalTimerExecutionMachine.complete:invocation[0]';
    requestWakeLockSentinel: 'done.invoke.intervalTimerExecutionMachine.initWakeLockSentinel:invocation[0]';
    restTimeExecution: 'done.invoke.intervalTimerExecutionMachine.restTime:invocation[0]';
    roundResetTimeExecution: 'done.invoke.intervalTimerExecutionMachine.roundResetTime:invocation[0]';
    workTimeExecution: 'done.invoke.intervalTimerExecutionMachine.workTime:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    assignWakeLockSentinel:
      | 'done.invoke.intervalTimerExecutionMachine.complete:invocation[0]'
      | 'done.invoke.intervalTimerExecutionMachine.initWakeLockSentinel:invocation[0]';
    decreaseCurrentTime: 'DECREASE_CURRENT_TIME';
    decreaseExerciseCount: 'done.invoke.intervalTimerExecutionMachine.workTime:invocation[0]';
    decreaseRoundCount: '';
    decreaseTotalTime: 'DECREASE_TOTAL_TIME';
    resetExerciseCount: '';
    resetState: 'START_EXECUTION' | 'STOP_EXECUTION';
    setIsExecuting: 'START_EXECUTION';
    setIsNotExecuting: '' | 'PAUSE_EXECUTION' | 'STOP_EXECUTION';
    setRestTime: '';
    setRoundResetTime: '';
    setWorkTime:
      | ''
      | 'START_EXECUTION'
      | 'done.invoke.intervalTimerExecutionMachine.initWakeLockSentinel:invocation[0]'
      | 'error.platform.intervalTimerExecutionMachine.initWakeLockSentinel:invocation[0]';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    isRemainingExerciseCountZero: '';
    isRemainingRoundCountZero: '';
  };
  eventsCausingServices: {
    releaseWakeLockSentinel: '';
    requestWakeLockSentinel: 'START_EXECUTION';
    restTimeExecution: '';
    roundResetTimeExecution: '';
    workTimeExecution:
      | ''
      | 'START_EXECUTION'
      | 'done.invoke.intervalTimerExecutionMachine.initWakeLockSentinel:invocation[0]'
      | 'error.platform.intervalTimerExecutionMachine.initWakeLockSentinel:invocation[0]';
  };
  matchesStates:
    | 'complete'
    | 'idle'
    | 'initWakeLockSentinel'
    | 'restTime'
    | 'restTimeDone'
    | 'roundResetTime'
    | 'roundResetTimeDone'
    | 'workTime'
    | 'workTimeDone';
  tags: never;
}
