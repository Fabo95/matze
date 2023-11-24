import { IntervalTimerDetailConfigurationOption } from 'components/blocks/intervalTimer/components/intervalTimerDetail/components/IntervalTimerDetailConfigurationOptions/components/intervalTimerDetailConfigurationOption';
import { Box } from 'components/core/box';
import { IntervalTimerConfigurationOptionProps } from 'components/blocks/intervalTimer/components/utils/intervalTimerTypes';

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
        icon,
        title,
        intensity,
        intensityType,
        sliderRange,
        configurationType,
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
      )
    )}
  </Box>
);
