"use client";

import { Interval } from "@Interval/api/utils/apiTypes";
import { IntervalTimerDetail } from "@Interval/blocks/intervalTimer/components/intervalTimerDetail/intervalTimerDetail";
import { IntervalTimerExecution } from "@Interval/blocks/intervalTimer/components/intervalTimerExecution/intervalTimerExecution";
import {
    IntervalTimerConfigurationOptionProps,
    IntervalTimerExecutionOverviewButtonProps,
} from "@Interval/blocks/intervalTimer/components/utils/intervalTimerTypes";
import { createIntervalTimerExecutionMachine } from "@Interval/blocks/intervalTimer/intervalTimerExecutionMachine/IntervalTimerExecutionMachine";
import { IntervalTimerExecutionMachineProvider } from "@Interval/blocks/intervalTimer/intervalTimerExecutionMachineContext/intervalTimerExecutionMachineContext";
import { getTotalIntervalTime } from "@Interval/utils/helpers";
import { useReactiveCallback } from "@Interval/utils/hooks";

type IntervalTimerBlockProps = {
    configurationOptionsProps: IntervalTimerConfigurationOptionProps[];
    executionOverviewButtonProps: IntervalTimerExecutionOverviewButtonProps[];
    interval: Interval;
};

export const IntervalTimerBlock = ({
    configurationOptionsProps,
    executionOverviewButtonProps,
    interval,
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
        <IntervalTimerExecutionMachineProvider machine={intervalTimerExecutionMachine}>
            <IntervalTimerExecution nextIsExecution={nextIsExecution} />

            <IntervalTimerDetail
                configurationOptionsProps={configurationOptionsProps}
                executionOverviewButtonProps={executionOverviewButtonProps}
            />
        </IntervalTimerExecutionMachineProvider>
    );
};
