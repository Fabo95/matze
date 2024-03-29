import { EMPTY, from, merge, mergeMap, Observable, startWith, switchMap, take } from "rxjs";
import { interval as rxInterval } from "rxjs/internal/observable/interval";

import {
    IntervalTimerExecutionMachineContext,
    IntervalTimerExecutionMachineEvents,
} from "@Interval/blocks/intervalTimer/intervalTimerExecutionMachine/utils/intervalTimerExecutionTypes";
import { ValueOf } from "@Interval/utils/types";

export const getIntervalTimerExecution = <T>({
    contextValue,
    event,
    isExecuting$,
}: {
    contextValue: ValueOf<Omit<IntervalTimerExecutionMachineContext, "isAutoExecution" | "isExecuting">>;
    event: IntervalTimerExecutionMachineEvents[];
    isExecuting$: Observable<T>;
}) =>
    merge(isExecuting$).pipe(
        startWith(true),
        switchMap((shouldStart) => (shouldStart ? rxInterval(1000) : EMPTY)),
        mergeMap(() => from(event)),
        take(Number(contextValue) * 2)
    );

export const getInitialCountContext = (count: number) => ({
    remaining: count,
    total: count,
});
