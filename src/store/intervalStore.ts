import { create } from 'zustand';
import { Interval } from 'api/utils/apiTypes';

export type IntervalStore = Interval & {
  setInterval: (interval: Partial<Interval>) => void;
};

export const useIntervalStore = create<IntervalStore>((set) => ({
  exerciseCount: 0,
  restTime: 0,
  roundCount: 0,
  roundResetTime: 0,
  setInterval: (interval: Partial<Interval>) => set(interval),
  userId: 0,
  workTime: 0,
}));
