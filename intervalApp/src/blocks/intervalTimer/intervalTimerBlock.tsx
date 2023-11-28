"use client";

import { useMemo } from "react";

import { Interval } from "@Interval/api/utils/apiTypes";
import { IntervalTimerDetail } from "@Interval/blocks/intervalTimer/components/intervalTimerDetail/intervalTimerDetail";
import { IntervalTimerExecution } from "@Interval/blocks/intervalTimer/components/intervalTimerExecution/intervalTimerExecution";
import { createIntervalTimerExecutionMachine } from "@Interval/blocks/intervalTimer/intervalTimerExecutionMachine/IntervalTimerExecutionMachine";
import { IntervalTimerExecutionMachineProvider } from "@Interval/blocks/intervalTimer/intervalTimerExecutionMachineContext/intervalTimerExecutionMachineContext";
import { getTotalIntervalTime } from "@Interval/utils/helpers";
import { useReactiveCallback } from "@Interval/utils/hooks";
import { Page } from "@Interval/components/core/page/page";

type IntervalTimerBlockProps = {
    interval: Interval;
};

export const IntervalTimerBlock = ({ interval }: IntervalTimerBlockProps) => {
    // --- STATE ---

    const [nextIsExecution, isExecuting$] = useReactiveCallback();

    const intervalTimerExecutionMachine = createIntervalTimerExecutionMachine({
        ...interval,
        isExecuting$,
        totalTime: getTotalIntervalTime(interval),
    });

    // --- MEMOIZED DATA ---

    const pageBlockStart = useMemo(
        () => <IntervalTimerExecution nextIsExecution={nextIsExecution} />,
        [nextIsExecution]
    );

    const pageBlockEnd = useMemo(() => <IntervalTimerDetail interval={interval} />, [interval]);

    // --- RENDER ---

    return (
        <IntervalTimerExecutionMachineProvider machine={intervalTimerExecutionMachine}>
            <Page blockEnd={pageBlockEnd} blockStart={pageBlockStart} />
        </IntervalTimerExecutionMachineProvider>
    );
};
