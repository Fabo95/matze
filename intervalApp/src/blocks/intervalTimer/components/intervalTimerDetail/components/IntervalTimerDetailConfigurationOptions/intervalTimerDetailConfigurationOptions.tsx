import { IntervalTimerDetailConfigurationOption } from '@Interval/blocks/intervalTimer/components/intervalTimerDetail/components/IntervalTimerDetailConfigurationOptions/components/intervalTimerDetailConfigurationOption';
import { IntervalTimerConfigurationOptionProps } from '@Interval/blocks/intervalTimer/components/utils/intervalTimerTypes';
import { Box } from '@Interval/components/core/box';

type IntervalTimerDetailConfigurationOptionsProps = {
  configurationOptionsProps: IntervalTimerConfigurationOptionProps[];
};

export const IntervalTimerDetailConfigurationOptions = ({
  configurationOptionsProps,
}: IntervalTimerDetailConfigurationOptionsProps) => (
  <Box className="interval-timer-detail-configuration-options">
    {configurationOptionsProps.map(
      ({
        className,
        configurationType,
        icon,
        intensity,
        intensityType,
        sliderRange,
        title,
      }) => (
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
      ),
    )}
  </Box>
);
