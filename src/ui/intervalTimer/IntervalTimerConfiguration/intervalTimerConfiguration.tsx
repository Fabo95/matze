import { Box } from 'common/box';
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
    <Box className="interval-timer-configuration">
      {/* This box styling enables circle cut off on to of the interval timer configuration box. */}
      <Box className="interval-timer-configuration-circle-cut-off" />
      <Box className="interval-timer-configuration-setting-options">
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
    </Box>
  );
};
