import { Interval } from 'app/[lang]/page';
import { getFormattedSecondsToMinutes } from 'utils/helpers';
import { Box } from 'base/box';

const getInterval = async (): Promise<Interval> =>
  fetch('http://localhost:8080/intervals', {
    next: { revalidate: 30, tags: ['312312312312312312'] },
  }).then((data) => data.json());

export const IntervalTimerCountDown = async () => {
  // --- DATA ---

  const interval = await getInterval();

  // --- HELPERS ---

  const totalIntervalTime = getFormattedSecondsToMinutes(
    (interval.restTime + interval.workTime) *
      interval.exerciseCount *
      interval.roundCount +
      interval.roundCount * interval.roundResetTime
  );

  // --- RENDER ---

  return (
    <Box className="bg-transparent h-1/3 items-center justify-center p-4 text-6xl font-bold text-white-full">
      {totalIntervalTime}
    </Box>
  );
};
