import { IntervalIntensityType } from 'api/utils/apiTypes';
import { ApplicationProcessMachine } from 'components/blocks/intervalTimer/intervalTimerExecutionMachine/IntervalTimerExecutionMachine';

export const selectRemainingCurrentTime = ({
  context,
}: ApplicationProcessMachine) => context.remainingCurrentTime;

export const selectRemainingTotalTime = ({
  context,
}: ApplicationProcessMachine) => context.remainingTotalTime;

export const selectIsExecuting = ({ context }: ApplicationProcessMachine) =>
  context.isExecuting;

export const makeSelectTotalCount =
  (
    contextKey:
      | IntervalIntensityType.ROUND_COUNT
      | IntervalIntensityType.EXERCISE_COUNT
  ) =>
  ({ context }: ApplicationProcessMachine) =>
    context[contextKey].total;

export const makeSelectRemainingCount =
  (
    contextKey:
      | IntervalIntensityType.ROUND_COUNT
      | IntervalIntensityType.EXERCISE_COUNT
  ) =>
  ({ context }: ApplicationProcessMachine) =>
    context[contextKey].remaining;
