'use client';

import { getFormattedSeconds } from 'utils/helpers';
import { Box } from 'base/box';
import { useIntervalStore } from 'store/intervalStore';
import { selectInterval } from 'store/intervalSelectors';

export const IntervalTimerCountDown = () => {
  // --- DATA ---

  const interval = useIntervalStore(selectInterval);

  console.log('interval', interval);

  // --- HELPERS ---

  const totalIntervalTime =
    (interval.restTime + interval.workTime) *
      (interval.exerciseCount * interval.roundCount) +
    interval.roundCount * interval.roundResetTime;

  const formattedIntervalTime = getFormattedSeconds(totalIntervalTime);

  // --- RENDER ---

  return (
    <Box className="bg-transparent h-1/3 items-center justify-center p-4 text-6xl font-bold text-white-full">
      {formattedIntervalTime}
    </Box>
  );
};
