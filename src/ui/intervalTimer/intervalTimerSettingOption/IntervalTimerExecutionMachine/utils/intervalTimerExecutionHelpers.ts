import {
  EMPTY,
  map,
  merge,
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
} from 'ui/intervalTimer/intervalTimerSettingOption/IntervalTimerExecutionMachine/utils/intervalTimerExecutionTypes';
import { ValueOf } from 'utils/types';

export const getIntervalTimerExecution = <T>({
  startClick$,
  pauseClick$,
  isAutoExecution,
  event,
  contextValue,
}: {
  startClick$: Observable<T>;
  pauseClick$: Observable<T>;
  isAutoExecution: ValueOf<
    Pick<IntervalTimerExecutionMachineContext, 'isAutoExecution'>
  >;
  event: IntervalTimerExecutionMachineEvents;
  contextValue: ValueOf<
    Omit<IntervalTimerExecutionMachineContext, 'isAutoExecution'>
  >;
}) =>
  merge(startClick$, pauseClick$).pipe(
    startWith(isAutoExecution),
    switchMap((shouldStart) => (shouldStart ? rxInterval(1000) : EMPTY)),
    map(() => -1),
    scan(
      (accumulator: number, currentValue: number) => accumulator + currentValue,
      contextValue
    ),
    map(() => event),
    take(contextValue)
  );
