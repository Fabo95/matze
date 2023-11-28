import { Observable } from 'rxjs';
import { assign, createMachine, StateFrom } from 'xstate';

import { Interval } from '@Interval/api/utils/apiTypes';
import {
  getInitialCountContext,
  getIntervalTimerExecution,
} from '@Interval/blocks/intervalTimer/intervalTimerExecutionMachine/utils/intervalTimerExecutionHelpers';
import {
  IntervalTimerExecutionMachineContext,
  IntervalTimerExecutionMachineEvents,
  IntervalTimerExecutionMachineServices,
} from '@Interval/blocks/intervalTimer/intervalTimerExecutionMachine/utils/intervalTimerExecutionTypes';

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
  totalTime,
  workTime,
}: CreateIntervalTimerExecutionMachineProps<T>) =>
  createMachine(
    {
      context: {
        restTime,
        roundResetTime,
        workTime,
        exerciseCount: getInitialCountContext(exerciseCount),
        isExecuting: false,
        remainingCurrentTime: totalTime,
        remainingTotalTime: totalTime,
        roundCount: getInitialCountContext(roundCount),
      },
      id: 'intervalTimerExecutionMachine',
      initial: 'idle',
      on: {
        PAUSE_EXECUTION: {
          actions: 'setIsNotExecuting',
        },
        START_EXECUTION: {
          actions: 'setIsExecuting',
        },
        STOP_EXECUTION: {
          actions: ['resetState', 'setIsNotExecuting'],
          target: 'idle',
        },
      },
      predictableActionArguments: true,
      preserveActionOrder: true,
      schema: {
        context: {} as IntervalTimerExecutionMachineContext,
        events: {} as IntervalTimerExecutionMachineEvents,
        services: {} as IntervalTimerExecutionMachineServices,
      },
      states: {
        complete: {
          entry: ['setIsNotExecuting'],
          invoke: {
            onDone: {
              actions: 'assignWakeLockSentinel',
            },
            src: 'releaseWakeLockSentinel',
          },
          on: {
            START_EXECUTION: {
              actions: ['resetState', 'setIsExecuting'],
              target: 'workTime',
            },
          },
        },
        idle: {
          on: {
            // This EVENT takes precedence to the global one if we are in idle state.
            START_EXECUTION: {
              actions: 'setIsExecuting',
              target: 'initWakeLockSentinel',
            },
          },
        },
        initWakeLockSentinel: {
          invoke: {
            onDone: {
              actions: 'assignWakeLockSentinel',
              target: 'workTime',
            },
            onError: {
              target: 'workTime',
            },
            src: 'requestWakeLockSentinel',
          },
        },
        restTime: {
          entry: 'setRestTime',
          invoke: {
            onDone: {
              target: 'restTimeDone',
            },
            src: 'restTimeExecution',
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
          always: { cond: 'isRemainingRoundCountZero', target: 'complete' },
          entry: 'setRoundResetTime',
          invoke: {
            onDone: {
              target: 'roundResetTimeDone',
            },
            src: 'roundResetTimeExecution',
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
        workTime: {
          entry: 'setWorkTime',
          invoke: {
            onDone: {
              actions: 'decreaseExerciseCount',
              target: 'workTimeDone',
            },
            src: 'workTimeExecution',
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
              actions: ['resetExerciseCount', 'decreaseRoundCount'],
              cond: 'isRemainingExerciseCountZero',
              target: 'roundResetTime',
            },
            {
              target: 'restTime',
            },
          ],
        },
      },
      tsTypes:
        {} as import('@Interval/blocks/intervalTimer/intervalTimerExecutionMachine/IntervalTimerExecutionMachine.typegen').Typegen0,
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
        decreaseExerciseCount: assign({
          exerciseCount: (context) => ({
            remaining: context.exerciseCount.remaining - 1,
            total: exerciseCount,
          }),
        }),
        decreaseRoundCount: assign({
          roundCount: (context) => ({
            remaining: context.roundCount.remaining - 1,
            total: roundCount,
          }),
        }),
        decreaseTotalTime: assign({
          remainingTotalTime: (context) => context.remainingTotalTime - 1,
        }),

        // --- SET ACTIONS ---
        resetExerciseCount: assign({
          exerciseCount: () => getInitialCountContext(exerciseCount),
        }),
        resetState: assign({
          restTime,
          roundResetTime,
          workTime,
          exerciseCount: getInitialCountContext(exerciseCount),
          remainingCurrentTime: totalTime,
          // We make it an object with total and remaining property to assure an abstract usage.
          remainingTotalTime: totalTime,
          // We make it an object with total and remaining property to assure an abstract usage.
          roundCount: getInitialCountContext(roundCount),
        }),
        setIsExecuting: assign({
          isExecuting: () => true,
        }),

        setIsNotExecuting: assign({
          isExecuting: () => false,
        }),
        setRestTime: assign({
          remainingCurrentTime: (context) => context.restTime,
        }),

        // --- RESET ACTIONS ---
        setRoundResetTime: assign({
          remainingCurrentTime: (context) => context.roundResetTime,
        }),

        setWorkTime: assign({
          remainingCurrentTime: (context) => context.workTime,
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
        releaseWakeLockSentinel: async (context) => {
          const { wakeLockSentinel } = context;
          if (wakeLockSentinel) {
            await wakeLockSentinel.release();
            return;
          }

          return undefined;
        },

        requestWakeLockSentinel: async () => {
          if ('wakeLock' in navigator) {
            return await navigator.wakeLock.request('screen');
          }

          return undefined;
        },

        restTimeExecution: (context) =>
          getIntervalTimerExecution({
            isExecuting$,
            contextValue: context.restTime,
            event: [
              { type: 'DECREASE_CURRENT_TIME' },
              { type: 'DECREASE_TOTAL_TIME' },
            ],
          }),

        roundResetTimeExecution: (context) =>
          getIntervalTimerExecution({
            isExecuting$,
            contextValue: context.roundResetTime,
            event: [
              { type: 'DECREASE_CURRENT_TIME' },
              { type: 'DECREASE_TOTAL_TIME' },
            ],
          }),

        workTimeExecution: (context) =>
          getIntervalTimerExecution({
            isExecuting$,
            contextValue: context.workTime,
            event: [
              { type: 'DECREASE_CURRENT_TIME' },
              { type: 'DECREASE_TOTAL_TIME' },
            ],
          }),
      },
    },
  );

export type ApplicationProcessMachine = StateFrom<
  typeof createIntervalTimerExecutionMachine
>;
