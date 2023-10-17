'use client';

import { useReactiveCallback } from 'utils/hooks';
import { createIntervalTimerExecutionMachine } from 'ui/home/intervalTimerExecutionMachine/IntervalTimerExecutionMachine';
import { getTotalIntervalTime } from 'utils/helpers';
import { IntervalTimerExecution } from 'ui/home/components/intervalTimerExecution/intervalTimerExecution';
import { IntervalTimerDetail } from 'ui/home/components/intervalTimerDetail/intervalTimerDetail';
import { Interval } from 'api/utils/apiTypes';
import {
  IntervalTimerConfigurationOptionProps,
  IntervalTimerExecutionOverviewButtonProps,
} from 'ui/home/components/utils/intervalTimerTypes';
import { IntervalTimerExecutionMachineProvider } from 'ui/home/intervalTimerExecutionMachineContext/intervalTimerExecutionMachineContext';

type IntervalTimerProps = {
  interval: Interval;
  configurationOptionsProps: IntervalTimerConfigurationOptionProps[];
  executionOverviewButtonProps: IntervalTimerExecutionOverviewButtonProps[];
};

export const IntervalTimer = ({
  interval,
  configurationOptionsProps,
  executionOverviewButtonProps,
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
      />
    </IntervalTimerExecutionMachineProvider>
  );
};
