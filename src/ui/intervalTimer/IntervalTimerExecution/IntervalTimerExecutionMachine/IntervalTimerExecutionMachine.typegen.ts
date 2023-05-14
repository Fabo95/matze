// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    '': { type: '' };
    'done.invoke.intervalTimerExecutionMachine.workTimeState:invocation[0]': {
      type: 'done.invoke.intervalTimerExecutionMachine.workTimeState:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'xstate.init': { type: 'xstate.init' };
    'xstate.stop': { type: 'xstate.stop' };
  };
  invokeSrcNameMap: {
    restTimeExecution: 'done.invoke.intervalTimerExecutionMachine.restTimeState:invocation[0]';
    roundResetTimeExecution: 'done.invoke.intervalTimerExecutionMachine.roundResetTimeState:invocation[0]';
    workTimeExecution: 'done.invoke.intervalTimerExecutionMachine.workTimeState:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    decreaseExerciseCount: 'done.invoke.intervalTimerExecutionMachine.workTimeState:invocation[0]';
    decreaseIntervalTime: 'DECREASE_INTERVAL_TIME';
    decreaseRoundCount: '';
    decreaseTotalTime: 'DECREASE_TOTAL_TIME';
    resetExerciseCount: '' | 'STOP_EXECUTION';
    resetTotalTime: 'STOP_EXECUTION';
    setIsAutoExecution:
      | 'done.invoke.intervalTimerExecutionMachine.workTimeState:invocation[0]'
      | 'xstate.stop';
    setIsNoAutoExecution: 'STOP_EXECUTION';
    setRestTime: '';
    setRoundResetTime: '';
    setWorkTime: '' | 'STOP_EXECUTION' | 'xstate.init';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    isExerciseCountZero: '';
    isRoundCountZero: '';
  };
  eventsCausingServices: {
    restTimeExecution: '';
    roundResetTimeExecution: '';
    workTimeExecution: '' | 'STOP_EXECUTION' | 'xstate.init';
  };
  matchesStates:
    | 'complete'
    | 'restTimeDoneState'
    | 'restTimeState'
    | 'roundResetTimeDoneState'
    | 'roundResetTimeState'
    | 'workTimeDoneState'
    | 'workTimeState';
  tags: never;
}
