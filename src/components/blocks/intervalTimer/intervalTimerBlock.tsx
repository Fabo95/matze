'use client';

import { Interval } from 'api/utils/apiTypes';
import { IntervalTimerDetail } from 'components/blocks/intervalTimer/components/intervalTimerDetail/intervalTimerDetail';
import { IntervalTimerExecution } from 'components/blocks/intervalTimer/components/intervalTimerExecution/intervalTimerExecution';
import {
  IntervalTimerConfigurationOptionProps,
  IntervalTimerExecutionOverviewButtonProps,
} from 'components/blocks/intervalTimer/components/utils/intervalTimerTypes';
import { createIntervalTimerExecutionMachine } from 'components/blocks/intervalTimer/intervalTimerExecutionMachine/IntervalTimerExecutionMachine';
import { IntervalTimerExecutionMachineProvider } from 'components/blocks/intervalTimer/intervalTimerExecutionMachineContext/intervalTimerExecutionMachineContext';
import { getTotalIntervalTime } from 'utils/helpers';
import { useReactiveCallback } from 'utils/hooks';

type IntervalTimerBlockProps = {
  interval: Interval;
  configurationOptionsProps: IntervalTimerConfigurationOptionProps[];
  executionOverviewButtonProps: IntervalTimerExecutionOverviewButtonProps[];
};

export const IntervalTimerBlock = ({
  interval,
  configurationOptionsProps,
  executionOverviewButtonProps,
}: IntervalTimerBlockProps) => {
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
