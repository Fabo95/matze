import { useEffect, useMemo } from "react";

import {
    executeIntervalTimerExecutionBackgroundGradientStrategy,
    getIntervalTimerExecutionBackgroundGradientStrategies,
} from "@Interval/blocks/intervalTimer/components/intervalTimerExecution/utils/intervalTimerExecutionHelpers";
import { useSelector } from "@Interval/blocks/intervalTimer/intervalTimerExecutionMachineContext/intervalTimerExecutionMachineContext";
import {
    selectIntervalTimerExecutionState,
    selectIsExecuting,
    selectRemainingCurrentTime,
} from "@Interval/blocks/intervalTimer/intervalTimerExecutionMachineContext/utils/intervalTimerExecutionMachineSelectors";
import { Pulse } from "@Interval/components/core/pulse/pulse";
import { Text } from "@Interval/components/core/text";
import { getFormattedSeconds } from "@Interval/utils/helpers";

export const IntervalTimerExecution = () => {
    // --- STATE ---

    const isExecuting = useSelector(selectIsExecuting);
    const remainingCurrentTime = useSelector(selectRemainingCurrentTime);
    const intervalTimerExecutionState = useSelector(selectIntervalTimerExecutionState);

    // --- MEMOIZED DATA ---

    const intervalTimerExecutionBackgroundGradientStrategies = useMemo(
        () => getIntervalTimerExecutionBackgroundGradientStrategies(),
        []
    );

    // --- HELPERS ---

    const formattedIntervalTime = getFormattedSeconds(remainingCurrentTime);

    // --- EFFECTS ---

    useEffect(() => {
        intervalTimerExecutionBackgroundGradientStrategies.forEach((backgroundGradientStrategy) =>
            executeIntervalTimerExecutionBackgroundGradientStrategy({
                backgroundGradientStrategy,
                intervalTimerExecutionStateValue: intervalTimerExecutionState,
            })
        );

        return () => {
            document.body.className = "";
        };
    }, [intervalTimerExecutionBackgroundGradientStrategies, intervalTimerExecutionState]);

    // --- RENDER ---

    return (
        <>
            <Text className="interval-timer-execution-intro">{formattedIntervalTime}</Text>

            <Pulse isAnimating={isExecuting} />
        </>
    );
};
