'use client';

import { Box } from 'common/box';
import { IntervalTimerConfigurationOptionProps } from 'ui/intervalTimer/utils/intervalTimerHelpers';
import { IntervalTimerConfigurationOption } from 'ui/intervalTimer/IntervalTimerConfiguration/components/intervalTimerConfigurationOption';
import { Swiper } from 'common/swiper';

type IntervalTimerConfigurationProps = {
  configurationOptionsProps: IntervalTimerConfigurationOptionProps[];
  primaryButtonTitle: string;
};

export const IntervalTimerConfiguration = ({
  configurationOptionsProps,
  primaryButtonTitle,
}: IntervalTimerConfigurationProps) => {
  // --- RENDER ---
  return (
    <Box className="interval-timer-configuration">
      {/* This box styling enables circle cut off on to of the interval timer configuration box. */}
      <Box className="interval-timer-configuration-circle-cut-off" />
      <Swiper>
        <Box className="interval-timer-configuration-setting-options">
          {configurationOptionsProps.map(
            ({
              className,
              icon,
              title,
              intensity,
              intensityType,
              sliderRange,
              configurationType,
            }) => (
              <IntervalTimerConfigurationOption
                className={className}
                configurationType={configurationType}
                icon={icon}
                intensity={intensity}
                intensityType={intensityType}
                key={title}
                primaryButtonTitle={primaryButtonTitle}
                sliderRange={sliderRange}
                title={title}
              />
            )
          )}
        </Box>
      </Swiper>
    </Box>
  );
};
