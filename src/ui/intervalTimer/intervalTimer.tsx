import { Box } from 'base/box';
import { Interval } from 'app/[lang]/page';
import { getIntervalTimerSettingOptionsProps } from 'ui/intervalTimer/utils/intervalTimerHelpers';
import { TFunction } from 'utils/types';
import { IntervalTimerSettingOption } from 'ui/intervalTimer/intervalTimerSettingOption/intervalTimerSettingOption';

export const IntervalTimer = ({
  interval,
  t,
}: {
  interval: Interval;
  t: TFunction;
}) => {
  // --- HELPERS ---

  const intervalTimerSettingOptionsProps = getIntervalTimerSettingOptionsProps({
    interval,
    t,
  });

  // --- RENDER ---

  return (
    <Box className="bg-transparent h-2/3 rounded-t-lg bg-white-full p-4 pt-24">
      {intervalTimerSettingOptionsProps.map(
        ({ className, icon, title, intensity }) => (
          <IntervalTimerSettingOption
            className={className}
            icon={icon}
            intensity={intensity}
            key={title}
            title={title}
          />
        )
      )}
    </Box>
  );
};
