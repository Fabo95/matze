'use client';

import { useMachine } from '@xstate/react';

import { getFormattedSeconds, getTotalIntervalTime } from 'utils/helpers';
import { Box } from 'common/box';
import { Interval } from 'api/utils/apiTypes';
import { UnstyledButton } from 'common/unstyledButton';
import { Row } from 'common/row';
import { Text } from 'common/text';
import { useReactiveCallback } from 'utils/hooks';
import { createIntervalTimerExecutionMachine } from 'ui/intervalTimer/IntervalTimerExecution/IntervalTimerExecutionMachine/IntervalTimerExecutionMachine';
import { PlayIcon } from 'icons/playIcon';
import { useRef } from 'react';
import { HLine } from 'common/hLine';

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
    <Box className="background-transparent position-relative align-items-center justify-content-center padding-1 height-one-third">
      <Text
        className="margin-bottom-1 text-size-3-75 text-color-white-dark font-bold"
        ref={formattedIntervalTimeRef}
      >
        {formattedIntervalTime}
      </Text>
      <HLine
        className="margin-bottom-1 transition-150 height-2"
        style={{ width: formattedIntervalTimeRef?.current?.offsetWidth }}
      />

      <Text className="text-size-1-5">{formattedTotalTime}</Text>

      <Row>
        <UnstyledButton
          className="interval-timer-execution-play-button position-absolute left-half z-index-10 align-items-center justify-content-center border-radius-full background-white-dark bottom-0 flex"
          onClick={() => startNext(true)}
        >
          <PlayIcon className="position-relative" />
        </UnstyledButton>
      </Row>
    </Box>
  );
};
