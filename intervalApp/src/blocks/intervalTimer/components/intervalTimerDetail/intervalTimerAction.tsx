import { useCallback, useMemo } from "react";

import { UnstyledButton } from "@Interval/components/core/unstyledButton";
import { PauseIcon } from "@Interval/components/icons/pauseIcon";
import { PlayIcon } from "@Interval/components/icons/playIcon";
import {
    useActor,
    useSelector,
} from "@Interval/blocks/intervalTimer/intervalTimerExecutionMachineContext/intervalTimerExecutionMachineContext";
import { selectIsExecuting } from "@Interval/blocks/intervalTimer/intervalTimerExecutionMachineContext/utils/intervalTimerExecutionMachineSelectors";
import { createSearchParams } from "@Interval/utils/routing/routingHelpers";
import { usePathname, useRouter } from "@Interval/utils/routing/routingHooks";

export const IntervalTimerAction = () => {
    // --- STATE ---

    const [, send] = useActor();

    const isExecuting = useSelector(selectIsExecuting);
    const router = useRouter();
    const pathname = usePathname();

    // --- CALLBACKS ---

    const startIntervalTimerExecution = useCallback(() => {
        const searchParams = createSearchParams({ isExecuting: true });

        router.replace(`${pathname}?${searchParams}`);

        send({
            type: "START_EXECUTION",
        });
    }, [pathname, router, send]);

    const pauseIntervalTimerExecution = useCallback(() => {
        router.replace(pathname);

        send({
            type: "PAUSE_EXECUTION",
        });
    }, [pathname, router, send]);

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
