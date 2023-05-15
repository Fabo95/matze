'use client';

import { useMachine } from '@xstate/react';

import { getFormattedSeconds, getTotalIntervalTime } from 'utils/helpers';
import { Box } from 'base/box';
import { Interval } from 'api/utils/apiTypes';
import { UnstyledButton } from 'base/unstyledButton';
import { Row } from 'base/row';
import { Text } from 'base/text';
import { useReactiveCallback } from 'utils/hooks';
import { createIntervalTimerExecutionMachine } from 'ui/intervalTimer/IntervalTimerExecution/IntervalTimerExecutionMachine/IntervalTimerExecutionMachine';
import { PlayIcon } from 'icons/playIcon';
import { useRef } from 'react';
import { HLine } from 'base/HLine';

export const IntervalTimerExecution = ({
  interval: propsInterval,
}: {
  interval: Interval;
}) => {
  // --- REACTIVE ---

  const [startNext, start$] = useReactiveCallback();
  const [pauseNext, pause$] = useReactiveCallback();

  const formattedIntervalTimeRef = useRef<HTMLHRElement>(null);

  // --- STATE ---

  const intervalTimerExecutionMachine = createIntervalTimerExecutionMachine({
    ...propsInterval,
    pause$,
    start$,
    totalTime: getTotalIntervalTime(propsInterval),
  });

  const [intervalTimerExecutionState, send] = useMachine(
    intervalTimerExecutionMachine
  );

  // --- HELPERS ---

  const { intervalTime, totalTime } = intervalTimerExecutionState.context;

  const formattedTotalTime = getFormattedSeconds(totalTime);

  const formattedIntervalTime = getFormattedSeconds(intervalTime);

  // --- CALLBACKS ---

  const handleStopIntervalTimerExecution = () => {
    send({ type: 'STOP_EXECUTION' });
  };

  // --- RENDER ---

  return (
    <Box className="bg-transparent relative h-1/3 items-center justify-center p-4 ">
      <Text
        className="mb-4 text-6xl font-bold text-white-full"
        ref={formattedIntervalTimeRef}
      >
        {formattedIntervalTime}
      </Text>
      <HLine
        className="mb-4 h-0.5 transition"
        style={{ width: formattedIntervalTimeRef?.current?.offsetWidth }}
      />

      <Text className="text-2xl">{formattedTotalTime}</Text>

      <Row>
        <UnstyledButton
          className="absolute bottom-0 left-1/2 z-10 flex h-24 w-24 translate-x-[-50%] translate-y-[50%] transform items-center justify-center rounded-full bg-white-full"
          onClick={() => startNext(true)}
        >
          <PlayIcon className="relative left-0.5" />
        </UnstyledButton>
      </Row>
    </Box>
  );
};
