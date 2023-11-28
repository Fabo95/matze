import { useMemo } from "react";

import { IntervalTimerDetailConfigurationOption } from "@Interval/blocks/intervalTimer/components/intervalTimerDetail/components/IntervalTimerDetailConfigurationOptions/components/intervalTimerDetailConfigurationOption";
import { Box } from "@Interval/components/core/box";
import { getIntervalTimerConfigurationOptionsProps } from "@Interval/blocks/intervalTimer/components/utils/intervalTimerHelpers";
import { useClientTranslation } from "@Interval/utils/hooks";
import { Interval } from "@Interval/api/utils/apiTypes";

type IntervalTimerDetailConfigurationOptionsProps = {
    interval: Interval;
};

export const IntervalTimerDetailConfigurationOptions = ({ interval }: IntervalTimerDetailConfigurationOptionsProps) => {
    const t = useClientTranslation();

    // ---MEMOIZED DATA ---

    const configurationOptionsProps = useMemo(
        () =>
            getIntervalTimerConfigurationOptionsProps({
                interval,
                t,
            }),
        [interval, t]
    );

    // --- RENDER ---

    return (
        <Box className="interval-timer-detail-configuration-options">
            {configurationOptionsProps.map(
                ({ className, configurationType, icon, intensity, intensityType, sliderRange, title }) => (
                    <IntervalTimerDetailConfigurationOption
                        className={className}
                        configurationType={configurationType}
                        icon={icon}
                        intensity={intensity}
                        intensityType={intensityType}
                        key={title}
                        sliderRange={sliderRange}
                        title={title}
                    />
                )
            )}
        </Box>
    );
};
