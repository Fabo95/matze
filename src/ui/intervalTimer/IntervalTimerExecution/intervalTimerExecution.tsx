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
    <Box className="interval-timer-execution">
      <Text
        className="interval-timer-execution-intro"
        ref={formattedIntervalTimeRef}
      >
        {formattedIntervalTime}
      </Text>
      <HLine
        className="interval-timer-execution-dividing-line"
        style={{ width: formattedIntervalTimeRef?.current?.offsetWidth }}
      />

      <Text className="interval-timer-execution-text">
        {formattedTotalTime}
      </Text>

      <Row>
        <UnstyledButton
          className="interval-timer-execution-play-button"
          onClick={() => startNext(true)}
        >
          <PlayIcon />
        </UnstyledButton>
      </Row>
    </Box>
  );
};
