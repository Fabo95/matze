"use client";

import { useMemo } from "react";

import { Interval } from "@Interval/api/utils/apiTypes";
import { IntervalTimerDetail } from "@Interval/blocks/intervalTimer/components/intervalTimerDetail/intervalTimerDetail";
import { IntervalTimerExecution } from "@Interval/blocks/intervalTimer/components/intervalTimerExecution/intervalTimerExecution";
import { Page } from "@Interval/components/core/page/page";
import { IntervalTimerExecutionMachineProvider } from "@Interval/blocks/intervalTimer/intervalTimerExecutionMachineProvider/intervalTimerExecutionMachineProvider";
import { IntervalTimerAction } from "@Interval/blocks/intervalTimer/components/intervalTimerDetail/intervalTimerAction";

type IntervalTimerBlockProps = {
    interval: Interval;
};

export const IntervalTimerBlock = ({ interval }: IntervalTimerBlockProps) => {
    // --- MEMOIZED DATA ---

    const pageBlockStart = useMemo(() => <IntervalTimerExecution />, []);

    const pageBlockEnd = useMemo(() => <IntervalTimerDetail interval={interval} />, [interval]);

    const pageAction = useMemo(() => <IntervalTimerAction />, []);

    // --- RENDER ---

    return (
        <IntervalTimerExecutionMachineProvider interval={interval}>
            <Page blockEnd={pageBlockEnd} blockStart={pageBlockStart} pageAction={pageAction} />
        </IntervalTimerExecutionMachineProvider>
    );
};
