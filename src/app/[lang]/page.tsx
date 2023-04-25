import { getTFunction } from 'i18n/get-t-function';
import { Locale } from 'utils/types';
import { Box } from 'base/box';
import { IntervalTimer } from 'ui/intervalTimer/intervalTimer';

export type Interval = {
  userId: number;
  workTime: number;
  restTime: number;
  exerciseCount: number;
  roundCount: number;
  roundResetTime: number;
};

const getInterval = async (): Promise<Interval> =>
  fetch('http://localhost:8080/intervals').then((data) => data.json());

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = await getTFunction(lang);

  const interval = await getInterval();

  console.log('interval', interval);

  return (
    <>
      <Box className="bg-transparent h-1/3 items-center justify-center p-4 text-6xl font-bold text-white-full">
        00:30:00
      </Box>
      <IntervalTimer interval={interval} t={t} />
    </>
  );
}
