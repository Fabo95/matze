import { Box } from 'base/box';
import { Interval } from 'app/[lang]/page';
import { getIntervalTimerSettingOptions } from 'ui/intervalTimer/intervalTimerHelpers';
import { TFunction } from 'utils/types';
import { Row } from 'base/row';

export const IntervalTimer = ({
  interval,
  t,
}: {
  interval: Interval;
  t: TFunction;
}) => {
  // --- HELPERS ---

  const intervalTimerSettingOptions = getIntervalTimerSettingOptions({
    interval,
    t,
  });

  // --- RENDER ---

  return (
    <Box className="bg-transparent h-2/3 rounded-t-lg bg-white-full p-4 pt-24">
      {intervalTimerSettingOptions.map(
        ({ className, icon, title, intensity }) => (
          <Row
            className={`${className} mb-4 flex items-center justify-between rounded-2xl p-6 text-2xl font-semibold`}
            key={title}
          >
            <Row className="text-black-dark">
              {icon}
              {title}
            </Row>

            {intensity}
          </Row>
        )
      )}
    </Box>
  );
};
