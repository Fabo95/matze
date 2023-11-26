import { createActorContext } from '@xstate/react';

import { createIntervalTimerExecutionMachine } from '@Interval/components/blocks/intervalTimer/intervalTimerExecutionMachine/IntervalTimerExecutionMachine';
import { getReactiveCallback } from '@Interval/utils/helpers';

const [, isExecuting$] = getReactiveCallback();

const initialIntervalTimerExecutionMachine =
  createIntervalTimerExecutionMachine({
    isExecuting$,
    exerciseCount: 0,
    restTime: 0,
    roundCount: 0,
    roundResetTime: 0,
    totalTime: 0,
    userId: 0,
    workTime: 0,
  });

const IntervalTimerExecutionMachineContext = createActorContext(
  initialIntervalTimerExecutionMachine,
);

export const {
  Provider: IntervalTimerExecutionMachineProvider,
  useActor,
  useActorRef,
  useSelector,
} = IntervalTimerExecutionMachineContext;
