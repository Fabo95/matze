import { useCallback, useMemo } from "react";

import { UnstyledButton } from "@Interval/components/core/unstyledButton";
import { PauseIcon } from "@Interval/components/icons/pauseIcon";
import { PlayIcon } from "@Interval/components/icons/playIcon";
import {
    useActor,
    useSelector,
} from "@Interval/blocks/intervalTimer/intervalTimerExecutionMachineContext/intervalTimerExecutionMachineContext";
import { selectIsExecuting } from "@Interval/blocks/intervalTimer/intervalTimerExecutionMachineContext/utils/intervalTimerExecutionMachineSelectors";

export const IntervalTimerAction = () => {
    // --- STATE ---

    const [_, send] = useActor();

    const isExecuting = useSelector(selectIsExecuting);

    // --- CALLBACKS ---

    const startIntervalTimerExecution = useCallback(() => {
        send({
            type: "START_EXECUTION",
        });
    }, [send]);

    const pauseIntervalTimerExecution = useCallback(() => {
        send({
            type: "PAUSE_EXECUTION",
        });
    }, [send]);

    // --- HELPERS ---

    const handleIntervalTimerExecution = isExecuting ? pauseIntervalTimerExecution : startIntervalTimerExecution;

    // --- MEMOIZED DATA ---

    const buttonIcon = useMemo(() => {
        if (isExecuting) {
            return <PauseIcon />;
        }

        return <PlayIcon />;
    }, [isExecuting]);

    // --- RENDER ---

    return <UnstyledButton onClick={handleIntervalTimerExecution}>{buttonIcon}</UnstyledButton>;
};
