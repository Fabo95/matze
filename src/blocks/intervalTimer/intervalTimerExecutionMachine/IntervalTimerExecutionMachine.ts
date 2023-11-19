/* eslint-disable sort-keys-fix/sort-keys-fix */
import { assign, createMachine, StateFrom } from 'xstate';
import { Observable } from 'rxjs';

import { Interval } from 'api/utils/apiTypes';
import {
  IntervalTimerExecutionMachineContext,
  IntervalTimerExecutionMachineEvents,
  IntervalTimerExecutionMachineServices,
} from 'blocks/intervalTimer/intervalTimerExecutionMachine/utils/intervalTimerExecutionTypes';
import {
  getInitialCountContext,
  getIntervalTimerExecution,
} from 'blocks/intervalTimer/intervalTimerExecutionMachine/utils/intervalTimerExecutionHelpers';

// xstate typegen "src/**/*.ts?(x)" --watch

type CreateIntervalTimerExecutionMachineProps<T> = Omit<
  Interval,
  'createdAt' | 'updatedAt'
> & {
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
      tsTypes:
        {} as import('blocks/intervalTimer/intervalTimerExecutionMachine/IntervalTimerExecutionMachine.typegen').Typegen0,
      preserveActionOrder: true,
      predictableActionArguments: true,
      schema: {
        context: {} as IntervalTimerExecutionMachineContext,
        events: {} as IntervalTimerExecutionMachineEvents,
        services: {} as IntervalTimerExecutionMachineServices,
      },
      context: {
        workTime,
        restTime,
        roundResetTime,
        remainingCurrentTime: totalTime,
        remainingTotalTime: totalTime,
        isExecuting: false,
        exerciseCount: getInitialCountContext(exerciseCount),
        roundCount: getInitialCountContext(roundCount),
      },
      initial: 'idle',
      states: {
        idle: {
          on: {
            // This EVENT takes precedence to the global one if we are in idle state.
            START_EXECUTION: {
              target: 'initWakeLockSentinel',
              actions: 'setIsExecuting',
            },
          },
        },
        initWakeLockSentinel: {
          invoke: {
            src: 'requestWakeLockSentinel',
            onDone: {
              actions: 'assignWakeLockSentinel',
              target: 'workTime',
            },
            onError: {
              target: 'workTime',
            },
          },
        },
        workTime: {
          entry: 'setWorkTime',
          invoke: {
            src: 'workTimeExecution',
            onDone: {
              actions: 'decreaseExerciseCount',
              target: 'workTimeDone',
            },
          },
          on: {
            DECREASE_CURRENT_TIME: {
              actions: 'decreaseCurrentTime',
            },
            DECREASE_TOTAL_TIME: { actions: 'decreaseTotalTime' },
          },
        },
        workTimeDone: {
          always: [
            {
              cond: 'isRemainingExerciseCountZero',
              actions: ['resetExerciseCount', 'decreaseRoundCount'],
              target: 'roundResetTime',
            },
            {
              target: 'restTime',
            },
          ],
        },

        restTime: {
          entry: 'setRestTime',
          invoke: {
            src: 'restTimeExecution',
            onDone: {
              target: 'restTimeDone',
            },
          },
          on: {
            DECREASE_CURRENT_TIME: {
              actions: 'decreaseCurrentTime',
            },
            DECREASE_TOTAL_TIME: { actions: 'decreaseTotalTime' },
          },
        },
        restTimeDone: {
          always: {
            target: 'workTime',
          },
        },

        roundResetTime: {
          entry: 'setRoundResetTime',
          always: { cond: 'isRemainingRoundCountZero', target: 'complete' },
          invoke: {
            src: 'roundResetTimeExecution',
            onDone: {
              target: 'roundResetTimeDone',
            },
          },
          on: {
            DECREASE_CURRENT_TIME: {
              actions: 'decreaseCurrentTime',
            },
            DECREASE_TOTAL_TIME: { actions: 'decreaseTotalTime' },
          },
        },
        roundResetTimeDone: {
          always: {
            target: 'workTime',
          },
        },

        complete: {
          entry: ['setIsNotExecuting'],
          invoke: {
            src: 'releaseWakeLockSentinel',
            onDone: {
              actions: 'assignWakeLockSentinel',
            },
          },
          on: {
            START_EXECUTION: {
              target: 'workTime',
              actions: ['resetState', 'setIsExecuting'],
            },
          },
        },
      },
      on: {
        START_EXECUTION: {
          actions: 'setIsExecuting',
        },
        PAUSE_EXECUTION: {
          actions: 'setIsNotExecuting',
        },
        STOP_EXECUTION: {
          actions: ['resetState', 'setIsNotExecuting'],
          target: 'idle',
        },
      },
    },
    {
      actions: {
        assignWakeLockSentinel: assign({
          wakeLockSentinel: (context, event) => event.data,
        }),
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

        setIsExecuting: assign({
          isExecuting: () => true,
        }),
        setIsNotExecuting: assign({
          isExecuting: () => false,
        }),

        // --- RESET ACTIONS ---
        resetExerciseCount: assign({
          exerciseCount: () => getInitialCountContext(exerciseCount),
        }),

        resetState: assign({
          workTime,
          restTime,
          roundResetTime,
          remainingCurrentTime: totalTime,
          remainingTotalTime: totalTime,
          // We make it an object with total and remaining property to assure an abstract usage.
          exerciseCount: getInitialCountContext(exerciseCount),
          // We make it an object with total and remaining property to assure an abstract usage.
          roundCount: getInitialCountContext(roundCount),
        }),
      },
      delays: {},
      guards: {
        isRemainingExerciseCountZero: (context) =>
          context.exerciseCount.remaining === 0,
        isRemainingRoundCountZero: (context) =>
          context.roundCount.remaining === 0,
      },
      services: {
        requestWakeLockSentinel: async () => {
          if ('wakeLock' in navigator) {
            const wakeLockSentinel = await navigator.wakeLock.request('screen');

            return wakeLockSentinel;
          }

          return undefined;
        },

        releaseWakeLockSentinel: async (context) => {
          const { wakeLockSentinel } = context;
          if (wakeLockSentinel) {
            await wakeLockSentinel.release();
          }

          return undefined;
        },

        workTimeExecution: (context) =>
          getIntervalTimerExecution({
            isExecuting$,
            event: [
              { type: 'DECREASE_CURRENT_TIME' },
              { type: 'DECREASE_TOTAL_TIME' },
            ],
            contextValue: context.workTime,
          }),

        restTimeExecution: (context) =>
          getIntervalTimerExecution({
            isExecuting$,
            event: [
              { type: 'DECREASE_CURRENT_TIME' },
              { type: 'DECREASE_TOTAL_TIME' },
            ],
            contextValue: context.restTime,
          }),

        roundResetTimeExecution: (context) =>
          getIntervalTimerExecution({
            isExecuting$,
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
