import { createActorContext } from "@xstate/react";

import { createIntervalTimerExecutionMachine } from "@Interval/blocks/intervalTimer/intervalTimerExecutionMachine/IntervalTimerExecutionMachine";
import { getReactiveCallback } from "@Interval/utils/helpers";

const [nextIsExecution, isExecuting$] = getReactiveCallback<boolean>();

const initialIntervalTimerExecutionMachine = createIntervalTimerExecutionMachine({
    isExecuting$,
    exerciseCount: 0,
    nextIsExecution: nextIsExecution.next,
    restTime: 0,
    roundCount: 0,
    roundResetTime: 0,
    totalTime: 0,
    userId: 0,
    workTime: 0,
});

const IntervalTimerExecutionMachineContext = createActorContext(initialIntervalTimerExecutionMachine);

export const { Provider: MachineProvider, useActor, useActorRef, useSelector } = IntervalTimerExecutionMachineContext;
