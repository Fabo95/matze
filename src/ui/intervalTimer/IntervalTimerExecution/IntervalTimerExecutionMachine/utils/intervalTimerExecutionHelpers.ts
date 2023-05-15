import {
  EMPTY,
  from,
  map,
  merge,
  mergeMap,
  Observable,
  scan,
  startWith,
  switchMap,
  take,
} from 'rxjs';
import { interval as rxInterval } from 'rxjs/internal/observable/interval';

import {
  IntervalTimerExecutionMachineContext,
  IntervalTimerExecutionMachineEvents,
} from 'ui/intervalTimer/IntervalTimerExecution/IntervalTimerExecutionMachine/utils/intervalTimerExecutionTypes';
import { ValueOf } from 'utils/types';

export const getIntervalTimerExecution = <T>({
  start$,
  pause$,
  isAutoExecution,
  event,
  contextValue,
}: {
  start$: Observable<T>;
  pause$: Observable<T>;
  isAutoExecution: ValueOf<
    Pick<IntervalTimerExecutionMachineContext, 'isAutoExecution'>
  >;
  event: IntervalTimerExecutionMachineEvents[];
  contextValue: ValueOf<
    Omit<IntervalTimerExecutionMachineContext, 'isAutoExecution'>
  >;
}) =>
  merge(start$, pause$).pipe(
    startWith(isAutoExecution),
    switchMap((shouldStart) => (shouldStart ? rxInterval(1000) : EMPTY)),
    map(() => -1),
    scan(
      (accumulator: number, currentValue: number) => accumulator + currentValue,
      contextValue
    ),
    mergeMap(() => from(event)),
    take(contextValue * 2)
  );
