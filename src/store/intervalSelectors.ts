import { Interval } from 'app/[lang]/page';

export const selectInterval = (state: Interval) => ({
  exerciseCount: state.exerciseCount,
  restTime: state.restTime,
  roundCount: state.roundCount,
  roundResetTime: state.roundResetTime,
  workTime: state.workTime,
});
