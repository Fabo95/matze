import React, { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Box } from 'base/box';
import { IntervalTimerConfigurationType } from 'ui/intervalTimer/utils/intervalTimerTypes';
import { IntervalTimerConfigurationOptionProps } from 'ui/intervalTimer/utils/intervalTimerHelpers';

export const SliderTrack = ({
  type,
  range,
}: Pick<IntervalTimerConfigurationOptionProps, 'type' | 'range'>) => {
  // --- MEMOIZED DATA ---

  const dividingLinesAmount = useMemo(() => {
    // We want a 5-step track for configuration options of type time and a 1-step track for configuration options of type count.
    if (type === IntervalTimerConfigurationType.COUNT) {
      return range.to;
    }

    return (range.to + (!range.from ? 5 : 0)) / 5;
  }, [range.from, range.to, type]);

  const sliderTrack = useMemo(
    () =>
      new Array(dividingLinesAmount)
        .fill('')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-shadow
        .map((_, dividingLineIndex) => {
          const dividingTimeStyle = dividingLineIndex % 6 === 0 && 'w-16';
          const dividingCountStyle = dividingLineIndex % 5 === 0 && 'w-16';

          const dividingStyle =
            type === IntervalTimerConfigurationType.COUNT
              ? dividingCountStyle
              : dividingTimeStyle;

          return (
            <Box
              className={`h-0.5 w-10 self-center bg-white-full opacity-50 ${dividingStyle}`}
              key={uuidv4()}
            />
          );
        }),
    [dividingLinesAmount, type]
  );

  // --- RENDER ---

  return <Box className="absolute h-full justify-between">{sliderTrack}</Box>;
};
