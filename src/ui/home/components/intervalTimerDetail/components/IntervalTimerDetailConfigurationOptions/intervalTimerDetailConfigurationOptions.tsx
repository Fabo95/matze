import { IntervalTimerDetailConfigurationOption } from 'ui/home/components/intervalTimerDetail/components/IntervalTimerDetailConfigurationOptions/components/intervalTimerDetailConfigurationOption';
import { Box } from 'core/box';
import { IntervalTimerConfigurationOptionProps } from 'ui/home/components/utils/intervalTimerTypes';

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
