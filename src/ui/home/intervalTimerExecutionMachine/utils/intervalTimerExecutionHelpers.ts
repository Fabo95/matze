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
} from 'ui/home/intervalTimerExecutionMachine/utils/intervalTimerExecutionTypes';
import { ValueOf } from 'utils/types';

export const getIntervalTimerExecution = <T>({
  isExecuting$,
  event,
  contextValue,
}: {
  isExecuting$: Observable<T>;
  event: IntervalTimerExecutionMachineEvents[];
  contextValue: ValueOf<
    Omit<
      IntervalTimerExecutionMachineContext,
      'isAutoExecution' | 'isExecuting'
    >
  >;
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

export const requestWakeLockSentinel = async () => {
  if ('wakeLock' in navigator) {
    const wakeLockSentinel = await navigator.wakeLock.request('screen');

    return wakeLockSentinel;
  }

  return undefined;
};
