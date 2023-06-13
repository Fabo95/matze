// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    decreaseCurrentTime: 'DECREASE_CURRENT_TIME';
    decreaseExerciseCount: 'done.invoke.intervalTimerExecutionMachine.workTimeState:invocation[0]';
    decreaseRoundCount: '';
    decreaseTotalTime: 'DECREASE_TOTAL_TIME';
    resetExerciseCount: '' | 'STOP_EXECUTION';
    resetTotalTime: 'STOP_EXECUTION';
    setIsAutoExecution:
      | 'done.invoke.intervalTimerExecutionMachine.workTimeState:invocation[0]'
      | 'xstate.stop';
    setIsNoAutoExecution: 'STOP_EXECUTION';
    setIsPaused: 'PAUSE_EXECUTION';
    setIsStarted: 'START_EXECUTION';
    setRestTime: '';
    setRoundResetTime: '';
    setWorkTime: '' | 'STOP_EXECUTION' | 'xstate.init';
    resetState: 'STOP_EXECUTION';
    setIsExecuting: 'START_EXECUTION';
    setIsNotExecuting: 'PAUSE_EXECUTION' | 'STOP_EXECUTION';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {};
  matchesStates: undefined;
  tags: never;
}
