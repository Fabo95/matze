'use client';

import { useMachine } from '@xstate/react';

import { getFormattedSeconds, getTotalIntervalTime } from 'utils/helpers';
import { Box } from 'base/box';
import { Interval } from 'api/utils/apiTypes';
import { UnstyledButton } from 'base/unstyledButton';
import { Row } from 'base/row';
import { PlayIcon } from 'icons/playIcon';
import { Text } from 'base/text';
import { StopIcon } from 'icons/stopIcon';
import { PauseIcon } from 'icons/pauseIcon';
import { useReactiveCallback } from 'utils/hooks';
import { createIntervalTimerExecutionMachine } from 'ui/intervalTimer/IntervalTimerExecution/IntervalTimerExecutionMachine/IntervalTimerExecutionMachine';

export const IntervalTimerExecution = ({
  interval: propsInterval,
}: {
  interval: Interval;
}) => {
  // --- REACTIVE ---

  const [handleStartSubject, startClick$] = useReactiveCallback();
  const [handlePauseSubject, pauseClick$] = useReactiveCallback();

  // --- STATE ---

  const intervalTimerExecutionMachine = createIntervalTimerExecutionMachine({
    ...propsInterval,
    pauseClick$,
    startClick$,
    totalTime: getTotalIntervalTime(propsInterval),
  });

  const [intervalTimerExecutionState, send] = useMachine(
    intervalTimerExecutionMachine as any
  );

  // --- HELPERS ---

  const { intervalTime, totalTime } = intervalTimerExecutionState.context;

  const formattedTotalTime = getFormattedSeconds(totalTime);

  const formattedIntervalTime = getFormattedSeconds(intervalTime);

  console.log(
    intervalTimerExecutionState.context,
    'state:',
    intervalTimerExecutionState.value
  );

  // --- CALLBACKS ---

  const handleStopIntervalTimerExecution = () => {
    send({ type: 'STOP_EXECUTION' });
  };

  // --- RENDER ---

  return (
    <Box className="bg-transparent relative h-1/3 items-center justify-center p-4 text-6xl font-bold text-white-full">
      <Text className="mb-8 ">{formattedTotalTime}</Text>
      <Text className="mb-8 ">{formattedIntervalTime}</Text>

      <Row>
        <UnstyledButton onClick={() => handleStartSubject(true)}>
          <PlayIcon className="h-20 w-20 stroke-white-full" />
        </UnstyledButton>
        <UnstyledButton onClick={handleStopIntervalTimerExecution}>
          <StopIcon className="h-20 w-20 stroke-white-full" />
        </UnstyledButton>
        <UnstyledButton onClick={() => handlePauseSubject(false)}>
          <PauseIcon className="h-20 w-20 stroke-white-full" />
        </UnstyledButton>
      </Row>
    </Box>
  );
};
