import { ReactNode } from "react";

import { Observable } from "rxjs";

import { createIntervalTimerExecutionMachine } from "@Interval/blocks/intervalTimer/intervalTimerExecutionMachine/IntervalTimerExecutionMachine";
import { getTotalIntervalTime } from "@Interval/utils/helpers";
import { MachineProvider } from "@Interval/blocks/intervalTimer/intervalTimerExecutionMachineContext/intervalTimerExecutionMachineContext";
import { Interval } from "@Interval/api/utils/apiTypes";
import { useReactiveCallback } from "@Interval/utils/hooks";

type IntervalTimerExecutionMachineProviderProps = {
    children: ReactNode;
    interval: Interval;
};

export const IntervalTimerExecutionMachineProvider = ({
    children,
    interval,
}: IntervalTimerExecutionMachineProviderProps) => {
    // --- STATE ---

    const [nextIsExecution, isExecuting$] = useReactiveCallback<boolean>();

    const intervalTimerExecutionMachine = createIntervalTimerExecutionMachine({
        ...interval,
        isExecuting$,
        nextIsExecution,
        totalTime: getTotalIntervalTime(interval),
    });

    // --- RENDER ---

    return <MachineProvider machine={intervalTimerExecutionMachine}>{children} </MachineProvider>;
};
