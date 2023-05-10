import { create } from 'zustand';
import { Interval } from 'app/[lang]/page';

export const useIntervalStore = create<Interval>(() => ({
  exerciseCount: 0,
  restTime: 0,
  roundCount: 0,
  roundResetTime: 0,
  userId: 0,
  workTime: 0,
}));
