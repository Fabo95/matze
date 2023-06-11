'use client';

import { useReactiveCallback } from 'utils/hooks';
import { createIntervalTimerExecutionMachine } from 'ui/intervalTimer/IntervalTimerExecutionMachine/IntervalTimerExecutionMachine';
import { getTotalIntervalTime } from 'utils/helpers';
import { IntervalTimerExecution } from 'ui/intervalTimer/IntervalTimerExecution/intervalTimerExecution';
import { IntervalTimerDetail } from 'ui/intervalTimer/IntervalTimerConfiguration/intervalTimerDetail';
import { Interval } from 'api/utils/apiTypes';
import {
  IntervalTimerConfigurationOptionProps,
  IntervalTimerExecutionOverviewButtonProps,
} from 'ui/intervalTimer/utils/intervalTimerTypes';
import { IntervalTimerExecutionMachineProvider } from 'ui/intervalTimer/IntervalTimerExecutionMachineContext/intervalTimerExecutionMachineContext';

type IntervalTimerProps = {
  interval: Interval;
  configurationOptionsProps: IntervalTimerConfigurationOptionProps[];
  executionOverviewButtonProps: IntervalTimerExecutionOverviewButtonProps[];
  primaryButtonTitle: string;
  timeLeft: string;
};

export const IntervalTimer = ({
  interval,
  configurationOptionsProps,
  executionOverviewButtonProps,
  primaryButtonTitle,
  timeLeft,
}: IntervalTimerProps) => {
  // --- STATE ---

  const [nextIsExecution, isExecuting$] = useReactiveCallback();

  const intervalTimerExecutionMachine = createIntervalTimerExecutionMachine({
    ...interval,
    isExecuting$,
    totalTime: getTotalIntervalTime(interval),
  });

  // --- RENDER ---

  return (
    <IntervalTimerExecutionMachineProvider
      machine={intervalTimerExecutionMachine}
    >
      <IntervalTimerExecution nextIsExecution={nextIsExecution} />

      <IntervalTimerDetail
        configurationOptionsProps={configurationOptionsProps}
        executionOverviewButtonProps={executionOverviewButtonProps}
        primaryButtonTitle={primaryButtonTitle}
        timeLeft={timeLeft}
      />
    </IntervalTimerExecutionMachineProvider>
  );
};
