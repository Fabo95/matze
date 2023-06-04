'use client';

import { useReactiveCallback } from 'utils/hooks';
import { createIntervalTimerExecutionMachine } from 'ui/intervalTimer/IntervalTimerExecutionMachine/IntervalTimerExecutionMachine';
import { getTotalIntervalTime } from 'utils/helpers';
import { IntervalTimerExecution } from 'ui/intervalTimer/IntervalTimerExecution/intervalTimerExecution';
import { IntervalTimerDetail } from 'ui/intervalTimer/IntervalTimerConfiguration/intervalTimerDetail';
import { Interval } from 'api/utils/apiTypes';
import { useMachine } from '@xstate/react';
import { IntervalTimerConfigurationOptionProps } from 'ui/intervalTimer/utils/intervalTimerHelpers';

type IntervalTimerProps = {
  interval: Interval;
  configurationOptionsProps: IntervalTimerConfigurationOptionProps[];
  primaryButtonTitle: string;
};

export const IntervalTimer = ({
  interval,
  configurationOptionsProps,
  primaryButtonTitle,
}: IntervalTimerProps) => {
  // --- STATE ---

  const [nextIsExecution, isExecuting$] = useReactiveCallback();

  const intervalTimerExecutionMachine = createIntervalTimerExecutionMachine({
    ...interval,
    isExecuting$,
    totalTime: getTotalIntervalTime(interval),
  });

  const [intervalTimerExecutionState, send] = useMachine(
    intervalTimerExecutionMachine
  );

  // --- HELPERS ---

  const {
    remainingCurrentTime,
    remainingTotalTime,
    isExecuting,
    remainingRoundCount,
    remainingExerciseCount,
  } = intervalTimerExecutionState.context;

  const currentRound = interval.roundCount - remainingRoundCount;

  const currentExercise = interval.exerciseCount - remainingExerciseCount;

  // --- CALLBACKS ---

  const startIntervalTimerExecution = () => {
    send({ type: 'START_EXECUTION' });
    nextIsExecution(true);
  };

  const pauseIntervalTimerExecution = () => {
    send({ type: 'PAUSE_EXECUTION' });
    nextIsExecution(false);
  };

  const stopIntervalTimerExectuion = () => {
    send({ type: 'STOP_EXECUTION' });
  };

  // --- RENDER ---

  return (
    <>
      <IntervalTimerExecution
        isExecuting={isExecuting}
        key={JSON.stringify(interval)}
        pauseIntervalTimerExecution={pauseIntervalTimerExecution}
        remainingCurrentTime={remainingCurrentTime}
        startIntervalTimerExecution={startIntervalTimerExecution}
      />

      <IntervalTimerDetail
        configurationOptionsProps={configurationOptionsProps}
        currentExercise={currentExercise}
        currentRound={currentRound}
        primaryButtonTitle={primaryButtonTitle}
        remainingTotalTime={remainingTotalTime}
        totalExerciseCount={interval.exerciseCount}
        totalRoundCount={interval.roundCount}
      />
    </>
  );
};
