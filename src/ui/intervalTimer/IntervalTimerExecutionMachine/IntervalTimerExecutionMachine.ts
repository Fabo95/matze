/* eslint-disable sort-keys-fix/sort-keys-fix */
import { assign, createMachine, StateFrom } from 'xstate';
import { Observable } from 'rxjs';

import { Interval } from 'api/utils/apiTypes';
import {
  IntervalTimerExecutionMachineContext,
  IntervalTimerExecutionMachineEvents,
  State,
} from 'ui/intervalTimer/IntervalTimerExecutionMachine/utils/intervalTimerExecutionTypes';
import {
  getInitialCountContext,
  getIntervalTimerExecution,
} from 'ui/intervalTimer/IntervalTimerExecutionMachine/utils/intervalTimerExecutionHelpers';

// xstate typegen "src/**/*.ts?(x)" --watch

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
        remainingCurrentTime: 0,
        remainingTotalTime: totalTime,
        isExecuting: false,
        // We make it an object with total and remaining property to assure an abstract usage.
        exerciseCount: getInitialCountContext(exerciseCount),
        // We make it an object with total and remaining property to assure an abstract usage.
        roundCount: getInitialCountContext(roundCount),
      },

      initial: State.IDLE,

      states: {
        [State.IDLE]: {
          on: {
            // This EVENT takes precedence to the global one if we are in idle state.
            START_EXECUTION: {
              target: [State.WORK_TIME],
              actions: 'setIsExecuting',
            },
          },
        },

        [State.WORK_TIME]: {
          entry: 'setWorkTime',
          invoke: {
            src: 'workTimeExecution',
            onDone: {
              actions: 'decreaseExerciseCount',
              target: State.WORK_TIME_DONE,
            },
          },
          on: {
            DECREASE_CURRENT_TIME: {
              actions: 'decreaseCurrentTime',
            },
            DECREASE_TOTAL_TIME: { actions: 'decreaseTotalTime' },
          },
        },
        [State.WORK_TIME_DONE]: {
          always: [
            {
              cond: 'isRemainingExerciseCountZero',
              actions: ['resetExerciseCount', 'decreaseRoundCount'],
              target: State.ROUND_RESET_TIME,
            },
            {
              target: State.REST_TIME,
            },
          ],
        },

        [State.REST_TIME]: {
          entry: 'setRestTime',
          invoke: {
            src: 'restTimeExecution',
            onDone: {
              target: State.REST_TIME_DONE,
            },
          },
          on: {
            DECREASE_CURRENT_TIME: {
              actions: 'decreaseCurrentTime',
            },
            DECREASE_TOTAL_TIME: { actions: 'decreaseTotalTime' },
          },
        },
        [State.REST_TIME_DONE]: {
          always: {
            target: State.WORK_TIME,
          },
        },

        [State.ROUND_RESET_TIME]: {
          entry: 'setRoundResetTime',
          always: { cond: 'isRemainingRoundCountZero', target: State.COMPLETE },
          invoke: {
            src: 'roundResetTimeExecution',
            onDone: {
              target: State.ROUND_RESET_TIME_DONE,
            },
          },
          on: {
            DECREASE_CURRENT_TIME: {
              actions: 'decreaseCurrentTime',
            },
            DECREASE_TOTAL_TIME: { actions: 'decreaseTotalTime' },
          },
        },
        [State.ROUND_RESET_TIME_DONE]: {
          always: {
            target: State.WORK_TIME,
          },
        },

        [State.COMPLETE]: {
          entry: 'setIsNotExecuting',
          on: {
            START_EXECUTION: {
              target: [State.WORK_TIME],
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
          target: State.IDLE,
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
        resetTotalTime: assign({
          remainingTotalTime: () => totalTime,
        }),

        resetState: assign({
          workTime,
          restTime,
          roundResetTime,
          remainingCurrentTime: 0,
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
