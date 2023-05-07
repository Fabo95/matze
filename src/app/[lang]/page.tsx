import { getTFunction } from 'i18n/get-t-function';
import { Locale } from 'utils/types';
import { Box } from 'base/box';
import { IntervalTimerConfiguration } from 'ui/intervalTimer/intervalTimerConfiguration';
import { IntervalTimerCountDown } from 'ui/intervalTimer/intervalTimerCountDown';
import React from 'react';

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

  // --- DATA ---

  const interval = await getInterval();

  // --- RENDER ---

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <IntervalTimerCountDown />
      <IntervalTimerConfiguration interval={interval} t={t} />
    </>
  );
}
