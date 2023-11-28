import { useMemo } from "react";

import { IntervalTimerDetailExecutionOverviewButton } from "@Interval/blocks/intervalTimer/components/intervalTimerDetail/components/IntervalTimerDetailExecutionOverview/components/intervalTimerDetailExecutionOverviewButton";
import { useSelector } from "@Interval/blocks/intervalTimer/intervalTimerExecutionMachineContext/intervalTimerExecutionMachineContext";
import {
    makeSelectRemainingCount,
    makeSelectTotalCount,
    selectRemainingTotalTime,
} from "@Interval/blocks/intervalTimer/intervalTimerExecutionMachineContext/utils/intervalTimerExecutionMachineSelectors";
import { Box } from "@Interval/components/core/box";
import { Row } from "@Interval/components/core/row";
import { Text } from "@Interval/components/core/text";
import { ClockIcon } from "@Interval/components/icons/clockIcon";
import { getFormattedSeconds } from "@Interval/utils/helpers";
import { useClientTranslation } from "@Interval/utils/hooks";
import { getIntervalTimerExecutionOverviewButtonProps } from "@Interval/blocks/intervalTimer/components/utils/intervalTimerHelpers";

export const IntervalTimerDetailExecutionOverview = () => {
    const t = useClientTranslation();

    // --- STATE ---

    const remainingTotalTime = useSelector(selectRemainingTotalTime);

    // --- MEMOIZED DATA ---

    const executionOverviewButtonProps = useMemo(() => getIntervalTimerExecutionOverviewButtonProps(t), [t]);

    const formattedRemainingTotalTime = useMemo(() => getFormattedSeconds(remainingTotalTime), [remainingTotalTime]);

    // --- RENDER ---
    return (
        <Box className="interval-timer-detail-execution-overview">
            {executionOverviewButtonProps.map(({ className, icon, intensityType, title }) => (
                <IntervalTimerDetailExecutionOverviewButton
                    className={className}
                    icon={icon}
                    key={intensityType}
                    selectRemainingCount={makeSelectRemainingCount(intensityType)}
                    selectTotalCount={makeSelectTotalCount(intensityType)}
                    title={title}
                />
            ))}

            <Row className="interval-timer-detail-execution-overview-rest">
                <ClockIcon className="stroke-gray-dark" />
                <Text>{t("pages.home.intervalTimerOverview.timeLeft")}</Text>
                <Text className="interval-timer-detail-execution-overview-rest-text">
                    {formattedRemainingTotalTime}
                </Text>
            </Row>
        </Box>
    );
};
