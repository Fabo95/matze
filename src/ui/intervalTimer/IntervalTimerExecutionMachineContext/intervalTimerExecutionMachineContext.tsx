import { createActorContext } from '@xstate/react';

import { createIntervalTimerExecutionMachine } from 'ui/intervalTimer/IntervalTimerExecutionMachine/IntervalTimerExecutionMachine';
import { getReactiveCallback } from 'utils/helpers';

const [_, isExecuting$] = getReactiveCallback();

const initialIntervalTimerExecutionMachine =
  createIntervalTimerExecutionMachine({
    exerciseCount: 0,
    isExecuting$,
    restTime: 0,
    roundCount: 0,
    roundResetTime: 0,
    totalTime: 0,
    userId: 0,
    workTime: 0,
  });

const IntervalTimerExecutionMachineContext = createActorContext(
  initialIntervalTimerExecutionMachine
);

export const {
  useActor,
  useSelector,
  useActorRef,
  Provider: IntervalTimerExecutionMachineProvider,
} = IntervalTimerExecutionMachineContext;
