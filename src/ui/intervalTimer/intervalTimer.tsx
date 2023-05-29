'use client';

import { useReactiveCallback } from 'utils/hooks';
import { createIntervalTimerExecutionMachine } from 'ui/intervalTimer/IntervalTimerExecutionMachine/IntervalTimerExecutionMachine';
import { getTotalIntervalTime } from 'utils/helpers';
import { IntervalTimerExecution } from 'ui/intervalTimer/IntervalTimerExecution/intervalTimerExecution';
import {
  IntervalTimerConfiguration,
  IntervalTimerConfigurationProps,
} from 'ui/intervalTimer/IntervalTimerConfiguration/intervalTimerConfiguration';
import { Interval } from 'api/utils/apiTypes';
import { useMachine } from '@xstate/react';

type IntervalTimerProps = IntervalTimerConfigurationProps & {
  interval: Interval;
};

export const IntervalTimer = ({
  interval,
  configurationOptionsProps,
  primaryButtonTitle,
}: IntervalTimerProps) => {
  // --- STATE ---

  const [startNext, isExecuting$] = useReactiveCallback();

  const intervalTimerExecutionMachine = createIntervalTimerExecutionMachine({
    ...interval,
    isExecuting$,
    totalTime: getTotalIntervalTime(interval),
  });

  const [intervalTimerExecutionState, send] = useMachine(
    intervalTimerExecutionMachine as any
  );

  // --- HELPERS ---

  const { intervalTime, totalTime, isExecuting } =
    intervalTimerExecutionState.context;

  // --- CALLBACKS ---

  const startIntervalTimerExecution = () => {
    send({ type: 'START_EXECUTION' });
    startNext(true);
  };

  const pauseIntervalTimerExecution = () => {
    send({ type: 'PAUSE_EXECUTION' });
    startNext(false);
  };

  const stopIntervalTimerExectuion = () => {
    send({ type: 'STOP_EXECUTION' });
  };

  // --- RENDER ---

  return (
    <>
      <IntervalTimerExecution
        intervalTime={intervalTime}
        isExecuting={isExecuting}
        key={JSON.stringify(interval)}
        pauseIntervalTimerExecution={pauseIntervalTimerExecution}
        startIntervalTimerExecution={startIntervalTimerExecution}
        totalTime={totalTime}
      />
      <IntervalTimerConfiguration
        configurationOptionsProps={configurationOptionsProps}
        primaryButtonTitle={primaryButtonTitle}
      />
    </>
  );
};
