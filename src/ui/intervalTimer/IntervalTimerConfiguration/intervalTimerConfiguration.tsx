import { Box } from 'base/box';
import { Interval } from 'api/utils/apiTypes';
import { getIntervalTimerConfigurationOptionsProps } from 'ui/intervalTimer/utils/intervalTimerHelpers';
import { TFunction } from 'utils/types';
import { IntervalTimerConfigurationOption } from 'ui/intervalTimer/IntervalTimerConfiguration/components/intervalTimerConfigurationOption';

type IntervalTimerConfigurationProps = {
  interval: Interval;
  t: TFunction;
};

export const IntervalTimerConfiguration = ({
  interval,
  t,
}: IntervalTimerConfigurationProps) => {
  // --- HELPERS ---

  const intervalTimerSettingOptionsProps =
    getIntervalTimerConfigurationOptionsProps({
      interval,
      t,
    });

  const primaryButtonTitle = t('cta.confirm');

  // --- RENDER ---

  return (
    <Box className="grow overflow-auto rounded-t-lg bg-white-full p-4 pt-12 ">
      {intervalTimerSettingOptionsProps.map(
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
  );
};
