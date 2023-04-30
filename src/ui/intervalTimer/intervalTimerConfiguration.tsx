import { Box } from 'base/box';
import { Interval } from 'app/[lang]/page';
import { getIntervalTimerConfigurationOptionsProps } from 'ui/intervalTimer/utils/intervalTimerHelpers';
import { TFunction } from 'utils/types';
import { IntervalTimerConfigurationOption } from 'ui/intervalTimer/intervalTimerSettingOption/intervalTimerConfigurationOption';

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

  // --- RENDER ---

  return (
    <Box className="bg-transparent h-2/3 rounded-t-lg bg-white-full p-4 pt-24">
      {intervalTimerSettingOptionsProps.map(
        ({ className, icon, title, intensity, range, type }) => (
          <IntervalTimerConfigurationOption
            className={className}
            icon={icon}
            intensity={intensity}
            key={title}
            range={range}
            title={title}
            type={type}
          />
        )
      )}
    </Box>
  );
};
