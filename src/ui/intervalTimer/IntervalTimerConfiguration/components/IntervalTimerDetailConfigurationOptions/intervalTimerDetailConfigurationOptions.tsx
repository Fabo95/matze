import { IntervalTimerDetailConfigurationOption } from 'ui/intervalTimer/IntervalTimerConfiguration/components/IntervalTimerDetailConfigurationOptions/components/intervalTimerDetailConfigurationOption';
import { Box } from 'common/box';
import { IntervalTimerConfigurationOptionProps } from 'ui/intervalTimer/utils/intervalTimerTypes';

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
