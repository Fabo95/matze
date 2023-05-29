import {
  EMPTY,
  from,
  merge,
  mergeMap,
  Observable,
  startWith,
  switchMap,
  take,
} from 'rxjs';
import { interval as rxInterval } from 'rxjs/internal/observable/interval';

import {
  IntervalTimerExecutionMachineContext,
  IntervalTimerExecutionMachineEvents,
} from 'ui/intervalTimer/IntervalTimerExecutionMachine/utils/intervalTimerExecutionTypes';
import { ValueOf } from 'utils/types';

export const getIntervalTimerExecution = <T>({
  isExecuting$,
  event,
  contextValue,
  isAutoExecution,
}: {
  isExecuting$: Observable<T>;
  event: IntervalTimerExecutionMachineEvents[];
  contextValue: ValueOf<
    Omit<
      IntervalTimerExecutionMachineContext,
      'isAutoExecution' | 'isExecuting'
    >
  >;
  isAutoExecution: boolean;
}) =>
  merge(isExecuting$).pipe(
    startWith(isAutoExecution),
    switchMap((shouldStart) => (shouldStart ? rxInterval(1000) : EMPTY)),
    mergeMap(() => from(event)),
    take(contextValue * 2)
  );
