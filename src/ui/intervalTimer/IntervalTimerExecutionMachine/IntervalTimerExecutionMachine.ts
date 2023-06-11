/* eslint-disable sort-keys-fix/sort-keys-fix */

import { assign, createMachine, StateFrom } from 'xstate';
import { Observable } from 'rxjs';

import { Interval } from 'api/utils/apiTypes';
import {
  IntervalTimerExecutionMachineContext,
  IntervalTimerExecutionMachineEvents,
} from 'ui/intervalTimer/IntervalTimerExecutionMachine/utils/intervalTimerExecutionTypes';
import {
  getInitialCountContext,
  getIntervalTimerExecution,
} from 'ui/intervalTimer/IntervalTimerExecutionMachine/utils/intervalTimerExecutionHelpers';

type CreateIntervalTimerExecutionMachineProps<T> = Interval & {
  isExecuting$: Observable<T>;
  totalTime: number;
};

export const createIntervalTimerExecutionMachine = <T>({
  exerciseCount,
  isExecuting$,
  restTime,
  roundCount,
  roundResetTime,
  workTime,
  totalTime,
}: CreateIntervalTimerExecutionMachineProps<T>) =>
  createMachine(
    {
      id: 'intervalTimerExecutionMachine',
      tsTypes: {} as import('./IntervalTimerExecutionMachine.typegen').Typegen0,
      preserveActionOrder: true,
      predictableActionArguments: true,
      schema: {
        context: {} as IntervalTimerExecutionMachineContext,
        events: {} as IntervalTimerExecutionMachineEvents,
      },
      context: {
        workTime,
        restTime,
        roundResetTime,
        isAutoExecution: false,
        remainingCurrentTime: 0,
        remainingTotalTime: totalTime,
        isExecuting: false,
        // We make it an object with total and remaining property to assure an abstract usage.
        exerciseCount: getInitialCountContext(exerciseCount),
        // We make it an object with total and remaining property to assure an abstract usage.
        roundCount: getInitialCountContext(roundCount),
      },

      initial: 'workTimeState',

      states: {
        workTimeState: {
          entry: 'setWorkTime',
          invoke: {
            src: 'workTimeExecution',
            onDone: {
              actions: 'decreaseExerciseCount',
              target: 'workTimeDoneState',
            },
          },
          on: {
            DECREASE_CURRENT_TIME: {
              actions: 'decreaseCurrentTime',
            },
            DECREASE_TOTAL_TIME: { actions: 'decreaseTotalTime' },
          },
          exit: 'setIsAutoExecution',
        },
        workTimeDoneState: {
          always: [
            {
              cond: 'isExerciseCountZero',
              actions: ['resetExerciseCount', 'decreaseRoundCount'],
              target: 'roundResetTimeState',
            },
            {
              target: 'restTimeState',
            },
          ],
        },

        restTimeState: {
          entry: 'setRestTime',
          invoke: {
            src: 'restTimeExecution',
            onDone: {
              target: 'restTimeDoneState',
            },
          },
          on: {
            DECREASE_CURRENT_TIME: {
              actions: 'decreaseCurrentTime',
            },
            DECREASE_TOTAL_TIME: { actions: 'decreaseTotalTime' },
          },
        },
        restTimeDoneState: {
          always: {
            target: 'workTimeState',
          },
        },

        roundResetTimeState: {
          entry: 'setRoundResetTime',
          always: { cond: 'isRoundCountZero', target: 'complete' },
          invoke: {
            src: 'roundResetTimeExecution',
            onDone: {
              target: 'roundResetTimeDoneState',
            },
          },
          on: {
            DECREASE_CURRENT_TIME: {
              actions: 'decreaseCurrentTime',
            },
            DECREASE_TOTAL_TIME: { actions: 'decreaseTotalTime' },
          },
        },
        roundResetTimeDoneState: {
          always: {
            target: 'workTimeState',
          },
        },

        complete: {},
      },
      on: {
        START_EXECUTION: {
          actions: 'setIsStarted',
        },
        PAUSE_EXECUTION: {
          actions: 'setIsPaused',
        },
        STOP_EXECUTION: {
          actions: [
            'setIsNoAutoExecution',
            'resetExerciseCount',
            'resetTotalTime',
          ],
          target: 'workTimeState',
        },
      },
    },
    {
      actions: {
        // --- DECREASE ACTIONS ---
        decreaseCurrentTime: assign({
          remainingCurrentTime: (context) => context.remainingCurrentTime - 1,
        }),
        decreaseTotalTime: assign({
          remainingTotalTime: (context) => context.remainingTotalTime - 1,
        }),
        decreaseRoundCount: assign({
          roundCount: (context) => ({
            total: roundCount,
            remaining: context.roundCount.remaining - 1,
          }),
        }),
        decreaseExerciseCount: assign({
          exerciseCount: (context) => ({
            total: exerciseCount,
            remaining: context.exerciseCount.remaining - 1,
          }),
        }),

        // --- SET ACTIONS ---
        setWorkTime: assign({
          remainingCurrentTime: (context) => context.workTime,
        }),
        setRestTime: assign({
          remainingCurrentTime: (context) => context.restTime,
        }),
        setRoundResetTime: assign({
          remainingCurrentTime: (context) => context.roundResetTime,
        }),

        setIsAutoExecution: assign({
          isAutoExecution: () => true,
        }),
        setIsNoAutoExecution: assign({
          isAutoExecution: () => false,
        }),

        setIsStarted: assign({
          isExecuting: () => true,
        }),
        setIsPaused: assign({
          isExecuting: () => false,
        }),

        // --- RESET ACTIONS ---
        resetExerciseCount: assign({
          exerciseCount: () => getInitialCountContext(exerciseCount),
        }),
        resetTotalTime: assign({
          remainingTotalTime: () => totalTime,
        }),
      },
      delays: {},
      guards: {
        isExerciseCountZero: (context) => context.exerciseCount.remaining === 0,
        isRoundCountZero: (context) => context.roundCount.remaining === 0,
      },
      services: {
        workTimeExecution: (context) =>
          getIntervalTimerExecution({
            isExecuting$,
            isAutoExecution: context.isAutoExecution,
            event: [
              { type: 'DECREASE_CURRENT_TIME' },
              { type: 'DECREASE_TOTAL_TIME' },
            ],
            contextValue: context.workTime,
          }),

        restTimeExecution: (context) =>
          getIntervalTimerExecution({
            isExecuting$,
            isAutoExecution: context.isAutoExecution,
            event: [
              { type: 'DECREASE_CURRENT_TIME' },
              { type: 'DECREASE_TOTAL_TIME' },
            ],
            contextValue: context.restTime,
          }),

        roundResetTimeExecution: (context) =>
          getIntervalTimerExecution({
            isExecuting$,
            isAutoExecution: context.isAutoExecution,
            event: [
              { type: 'DECREASE_CURRENT_TIME' },
              { type: 'DECREASE_TOTAL_TIME' },
            ],
            contextValue: context.roundResetTime,
          }),
      },
    }
  );

export type ApplicationProcessMachine = StateFrom<
  typeof createIntervalTimerExecutionMachine
>;
