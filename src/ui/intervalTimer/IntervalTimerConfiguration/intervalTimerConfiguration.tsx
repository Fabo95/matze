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
    <Box className="flex-grow-1 border-radius-top-left-top-right-0-5 overflow-hidden">
      {/* This box styling enables circle cut off on to of the interval timer configuration box. */}
      <Box className="circle-cut-off padding-1 padding-top-3" />
      <Box className="background-white-dark padding-1 padding-top-3 flex-grow-1 overflow-auto">
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
