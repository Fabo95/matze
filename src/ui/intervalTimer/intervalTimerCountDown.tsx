'use client';

import { getFormattedSeconds, getTotalIntervalTime } from 'utils/helpers';
import { Box } from 'base/box';
import { Interval } from 'api/utils/apiTypes';
import { UnstyledButton } from 'base/unstyledButton';
import { Row } from 'base/row';
import { PlayIcon } from 'icons/playIcon';
import { Text } from 'base/text';
import { useEffect, useRef, useState } from 'react';
import { StopIcon } from 'icons/stopIcon';
import { PauseIcon } from 'icons/pauseIcon';
import {
  EMPTY,
  fromEvent,
  interval as rxInterval,
  mapTo,
  merge,
  repeat,
  scan,
  startWith,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs';

export const IntervalTimerCountDown = ({
  interval,
}: {
  interval: Interval;
}) => {
  // --- STATE ---

  const [state, setState] = useState(0);

  const startButtonRef = useRef<HTMLButtonElement>(null);
  const stopButtonRef = useRef<HTMLButtonElement>(null);
  const pauseButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (
      startButtonRef.current &&
      stopButtonRef.current &&
      pauseButtonRef.current
    ) {
      const startClick$ = fromEvent(startButtonRef.current, 'click');
      const stopClick$ = fromEvent(stopButtonRef.current, 'click');
      const pauseBtn$ = fromEvent(pauseButtonRef.current, 'click');

      merge(startClick$.pipe(mapTo(true)), pauseBtn$.pipe(mapTo(false)))
        .pipe(
          switchMap((shouldStart) => (shouldStart ? rxInterval(1000) : EMPTY)),
          tap((e) => console.log(e)),
          mapTo(-1),
          scan((acc: number, curr: number) => acc + curr, startValue),
          takeWhile((val) => val >= 0),
          startWith(startValue),
          takeUntil(stopClick$),
          repeat()
        )
        .subscribe((val) => {
          setState(val);
        });
    }
  }, []);

  const startValue = 10;

  console.log('satae', state);

  // --- HELPERS ---

  const totalIntervalTime = getTotalIntervalTime(interval);

  const formattedIntervalTime = getFormattedSeconds(totalIntervalTime);

  // --- RENDER ---

  return (
    <Box className="bg-transparent relative h-1/3 items-center justify-center p-4 text-6xl font-bold text-white-full">
      <Text className="mb-8 ">{formattedIntervalTime}</Text>

      <Row>
        <UnstyledButton ref={startButtonRef}>
          <PlayIcon className="h-20 w-20 stroke-white-full" />
        </UnstyledButton>
        <UnstyledButton ref={stopButtonRef}>
          <StopIcon className="h-20 w-20 stroke-white-full" />
        </UnstyledButton>
        <UnstyledButton ref={pauseButtonRef}>
          <PauseIcon className="h-20 w-20 stroke-white-full" />
        </UnstyledButton>
      </Row>
    </Box>
  );
};
