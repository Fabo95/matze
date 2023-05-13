/* eslint-disable sort-keys-fix/sort-keys-fix */

import { assign, createMachine, StateFrom } from 'xstate';
import { Observable } from 'rxjs';

import { Interval } from 'api/utils/apiTypes';
import {
  IntervalTimerExecutionMachineContext,
  IntervalTimerExecutionMachineEvents,
} from 'ui/intervalTimer/intervalTimerSettingOption/IntervalTimerExecutionMachine/utils/intervalTimerExecutionTypes';
import { getIntervalTimerExecution } from 'ui/intervalTimer/intervalTimerSettingOption/IntervalTimerExecutionMachine/utils/intervalTimerExecutionHelpers';

type CreateIntervalTimerExecutionMachineProps<T> = Interval & {
  startClick$: Observable<T>;
  pauseClick$: Observable<T>;
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
  startClick$,
  pauseClick$,
}: CreateIntervalTimerExecutionMachineProps<T>) =>
  createMachine(
    {
      // Machine identifier
      id: 'intervalTimerExecutionMachine',
      tsTypes: {} as import('./IntervalTimerExecutionMachine.typegen').Typegen0,
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
        workTime,
        isAutoExecution: false,
      },

      // Initial state
      initial: 'workTimeState',

      // State definitions
      states: {
        workTimeState: {
          invoke: {
            src: 'workTimeExecution',
            onDone: {
              actions: 'decreaseExerciseCount',
              target: 'workTimeDoneState',
            },
          },
          on: {
            DECREASE_WORK_TIME: { actions: 'decreaseWorkTime' },
          },
          exit: 'setIsAutoExecution',
        },
        workTimeDoneState: {
          always: [
            {
              cond: 'isExerciseCountZero',
              actions: [
                'resetExerciseCount',
                'decreaseRoundCount',
                'resetWorkTime',
              ],
              target: 'roundResetTimeState',
            },
            {
              actions: 'resetWorkTime',
              target: 'restTimeState',
            },
          ],
        },

        restTimeState: {
          invoke: {
            src: 'restTimeExecution',
            onDone: {
              target: 'restTimeDoneState',
            },
          },
          on: {
            DECREASE_REST_TIME: { actions: 'decreaseRestTime' },
          },
        },
        restTimeDoneState: {
          always: {
            actions: 'resetRestTime',
            target: 'workTimeState',
          },
        },

        roundResetTimeState: {
          always: { cond: 'isRoundCountZero', target: 'complete' },
          invoke: {
            src: 'roundResetTimeExecution',
            onDone: {
              target: 'roundResetTimeDoneState',
            },
          },
          on: {
            DECREASE_ROUND_RESET_TIME: { actions: 'decreaseRoundResetTime' },
          },
        },
        roundResetTimeDoneState: {
          always: {
            actions: 'resetRoundResetTime',
            target: 'workTimeState',
          },
        },

        complete: {},
      },
      on: {
        STOP_EXECUTION: {
          actions: [
            'setIsNoAutoExecution',
            'resetWorkTime',
            'resetRestTime',
            'resetRoundResetTime',
            'resetExerciseCount',
          ],
          target: 'workTimeState',
        },
      },
    },
    {
      actions: {
        setIsAutoExecution: assign({
          isAutoExecution: () => true,
        }),
        setIsNoAutoExecution: assign({
          isAutoExecution: () => false,
        }),

        resetWorkTime: assign({
          workTime: () => workTime,
        }),
        decreaseWorkTime: assign({
          workTime: (context) => context.workTime - 1,
        }),

        resetRestTime: assign({
          restTime: () => restTime,
        }),
        decreaseRestTime: assign({
          restTime: (context) => context.restTime - 1,
        }),

        resetRoundResetTime: assign({
          roundResetTime: () => roundResetTime,
        }),
        decreaseRoundResetTime: assign({
          roundResetTime: (context) => context.roundResetTime - 1,
        }),

        decreaseRoundCount: assign({
          roundCount: (context) => context.roundCount - 1,
        }),

        resetExerciseCount: assign({
          exerciseCount: () => exerciseCount,
        }),
        decreaseExerciseCount: assign({
          exerciseCount: (context) => context.exerciseCount - 1,
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
            startClick$,
            pauseClick$,
            isAutoExecution: context.isAutoExecution,
            event: { type: 'DECREASE_WORK_TIME' },
            contextValue: context.workTime,
          }),

        restTimeExecution: (context) =>
          getIntervalTimerExecution({
            startClick$,
            pauseClick$,
            isAutoExecution: context.isAutoExecution,
            event: { type: 'DECREASE_REST_TIME' },
            contextValue: context.restTime,
          }),

        roundResetTimeExecution: (context) =>
          getIntervalTimerExecution({
            startClick$,
            pauseClick$,
            isAutoExecution: context.isAutoExecution,
            event: {
              type: 'DECREASE_ROUND_RESET_TIME',
            },
            contextValue: context.roundResetTime,
          }),
      },
    }
  );
