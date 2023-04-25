import { Box } from 'base/box';
import { Interval } from 'app/[lang]/page';
import { getIntervalTimerSettingOptions } from 'ui/intervalTimer/intervalTimerHelpers';
import { getTFunction } from 'i18n/get-t-function';
import { Locale, TFunction } from 'utils/types';

export const IntervalTimer = ({
  interval,
  t,
}: {
  interval: Interval;
  t: TFunction;
}) => {
  const intervalTimerSettingOptions = getIntervalTimerSettingOptions({
    interval,
    t,
  });

  return (
    <Box className="bg-transparent h-2/3 rounded-t-lg bg-white-full p-4">
      {intervalTimerSettingOptions.map(
        ({ className, icon, title, intensity }) => (
          <Box className="font-semibold text-black-900" key={title}>
            {title}
          </Box>
        )
      )}
    </Box>
  );
};
