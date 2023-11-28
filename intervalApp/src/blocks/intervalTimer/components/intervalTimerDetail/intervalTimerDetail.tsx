"use client";

import { useMemo } from "react";

import { IntervalTimerDetailConfigurationOptions } from "@Interval/blocks/intervalTimer/components/intervalTimerDetail/components/IntervalTimerDetailConfigurationOptions/intervalTimerDetailConfigurationOptions";
import { IntervalTimerDetailExecutionOverview } from "@Interval/blocks/intervalTimer/components/intervalTimerDetail/components/IntervalTimerDetailExecutionOverview/intervalTimerDetailExecutionOverview";
import { useSelector } from "@Interval/blocks/intervalTimer/intervalTimerExecutionMachineContext/intervalTimerExecutionMachineContext";
import { selectIsExecuting } from "@Interval/blocks/intervalTimer/intervalTimerExecutionMachineContext/utils/intervalTimerExecutionMachineSelectors";
import { Box } from "@Interval/components/core/box";
import { Swiper } from "@Interval/components/core/swiper/swiper";
import { Interval } from "@Interval/api/utils/apiTypes";

export type IntervalTimerDetailProps = {
    interval: Interval;
};

export const IntervalTimerDetail = ({ interval }: IntervalTimerDetailProps) => {
    // --- STATE ---

    const isExecuting = useSelector(selectIsExecuting);

    // --- MEMOIZED DATA ---

    const autoSwipe = useMemo(
        () => ({
            itemIndex: 1,
            shouldSwipe: isExecuting,
        }),
        [isExecuting]
    );

    // --- RENDER ---

    return (
        <>
            {/* This box styling enables circle cut off of the interval timer detail box. */}
            <Box className="interval-timer-detail-circle-cut-off" />
            <Swiper autoSwipe={autoSwipe}>
                <IntervalTimerDetailConfigurationOptions interval={interval} />

                <IntervalTimerDetailExecutionOverview />
            </Swiper>
        </>
    );
};
