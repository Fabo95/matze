import { IntervalStore } from 'store/intervalStore';

export const selectInterval = (state: IntervalStore) => ({
  exerciseCount: state.exerciseCount,
  restTime: state.restTime,
  roundCount: state.roundCount,
  roundResetTime: state.roundResetTime,
  workTime: state.workTime,
});

export const selectSetInterval = (state: IntervalStore) => state.setInterval;
