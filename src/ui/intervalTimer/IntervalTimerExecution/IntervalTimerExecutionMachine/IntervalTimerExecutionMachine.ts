/* eslint-disable sort-keys-fix/sort-keys-fix */

import { assign, createMachine, StateFrom } from 'xstate';
import { Observable } from 'rxjs';

import { Interval } from 'api/utils/apiTypes';
import {
  IntervalTimerExecutionMachineContext,
  IntervalTimerExecutionMachineEvents,
} from 'ui/intervalTimer/IntervalTimerExecution/IntervalTimerExecutionMachine/utils/intervalTimerExecutionTypes';
import { getIntervalTimerExecution } from 'ui/intervalTimer/IntervalTimerExecution/IntervalTimerExecutionMachine/utils/intervalTimerExecutionHelpers';

type CreateIntervalTimerExecutionMachineProps<T> = Interval & {
  start$: Observable<T>;
  totalTime: number;
  pause$: Observable<T>;
};

export type ApplicationProcessMachine = StateFrom<
  typeof createIntervalTimerExecutionMachine
>;

export const createIntervalTimerExecutionMachine = <T>({
  exerciseCount,
  restTime,
  roundCount,
  roundResetTime,
  workTime,
  start$,
  totalTime,
  pause$,
}: CreateIntervalTimerExecutionMachineProps<T>) =>
  createMachine(
    {
      id: 'intervalTimerExecutionMachine',
      tsTypes:
        {} as import('ui/intervalTimer/IntervalTimerExecution/IntervalTimerExecutionMachine/IntervalTimerExecutionMachine.typegen').Typegen0,
      preserveActionOrder: true,
      predictableActionArguments: true,
      schema: {
        context: {} as IntervalTimerExecutionMachineContext,
        events: {} as IntervalTimerExecutionMachineEvents,
      },
      context: {
        exerciseCount,
        restTime,
        roundCount,
        roundResetTime,
        totalTime,
        workTime,
        intervalTime: 0,
        isAutoExecution: false,
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
            DECREASE_INTERVAL_TIME: { actions: 'decreaseIntervalTime' },
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
            DECREASE_INTERVAL_TIME: { actions: 'decreaseIntervalTime' },
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
            DECREASE_INTERVAL_TIME: { actions: 'decreaseIntervalTime' },
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
        decreaseIntervalTime: assign({
          intervalTime: (context) => context.intervalTime - 1,
        }),
        decreaseTotalTime: assign({
          totalTime: (context) => context.totalTime - 1,
        }),
        decreaseRoundCount: assign({
          roundCount: (context) => context.roundCount - 1,
        }),
        decreaseExerciseCount: assign({
          exerciseCount: (context) => context.exerciseCount - 1,
        }),

        // --- SET ACTIONS ---
        setWorkTime: assign({
          intervalTime: (context) => context.workTime,
        }),
        setRestTime: assign({
          intervalTime: (context) => context.restTime,
        }),
        setRoundResetTime: assign({
          intervalTime: (context) => context.roundResetTime,
        }),
        setIsAutoExecution: assign({
          isAutoExecution: () => true,
        }),
        setIsNoAutoExecution: assign({
          isAutoExecution: () => false,
        }),

        // --- RESET ACTIONS ---
        resetExerciseCount: assign({
          exerciseCount: () => exerciseCount,
        }),
        resetTotalTime: assign({
          totalTime: () => totalTime,
        }),
      },
      delays: {},
      guards: {
        isExerciseCountZero: (context) => context.exerciseCount === 0,
        isRoundCountZero: (context) => context.roundCount === 0,
      },
      services: {
        workTimeExecution: (context) =>
          getIntervalTimerExecution({
            start$,
            pause$,
            isAutoExecution: context.isAutoExecution,
            event: [
              { type: 'DECREASE_INTERVAL_TIME' },
              { type: 'DECREASE_TOTAL_TIME' },
            ],
            contextValue: context.workTime,
          }),

        restTimeExecution: (context) =>
          getIntervalTimerExecution({
            start$,
            pause$,
            isAutoExecution: context.isAutoExecution,
            event: [
              { type: 'DECREASE_INTERVAL_TIME' },
              { type: 'DECREASE_TOTAL_TIME' },
            ],
            contextValue: context.restTime,
          }),

        roundResetTimeExecution: (context) =>
          getIntervalTimerExecution({
            start$,
            pause$,
            isAutoExecution: context.isAutoExecution,
            event: [
              { type: 'DECREASE_INTERVAL_TIME' },
              { type: 'DECREASE_TOTAL_TIME' },
            ],
            contextValue: context.roundResetTime,
          }),
      },
    }
  );
