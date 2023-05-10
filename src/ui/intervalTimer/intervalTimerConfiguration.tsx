import { Box } from 'base/box';
import { Interval } from 'app/[lang]/page';
import { getIntervalTimerConfigurationOptionsProps } from 'ui/intervalTimer/utils/intervalTimerHelpers';
import { TFunction } from 'utils/types';
import { IntervalTimerConfigurationOption } from 'ui/intervalTimer/intervalTimerSettingOption/intervalTimerConfigurationOption';
import { useIntervalStore } from 'store/intervalStore';

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
    <Box className="bg-transparent h-2/3 rounded-t-lg bg-white-full p-4 pt-24">
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
