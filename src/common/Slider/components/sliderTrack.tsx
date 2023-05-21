import React, { useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Box } from 'common/box';
import { IntervalTimerConfigurationType } from 'ui/intervalTimer/utils/intervalTimerTypes';
import { IntervalTimerConfigurationOptionProps } from 'ui/intervalTimer/utils/intervalTimerHelpers';

export const SliderTrack = ({
  configurationType,
  sliderRange,
}: Pick<
  IntervalTimerConfigurationOptionProps,
  'configurationType' | 'sliderRange'
>) => {
  // --- CALLBACKS ---

  const getTotalDividingLines = useCallback(
    (additionalStepSize = 0) => {
      // We want a 5-step track for configuration options of type time and a 1-step track for configuration options of type count.
      if (configurationType === IntervalTimerConfigurationType.COUNT) {
        return sliderRange.to;
      }

      return (sliderRange.to + additionalStepSize) / 5;
    },
    [sliderRange.to, configurationType]
  );

  // --- MEMOIZED DATA ---

  const sliderTrack = useMemo(
    () =>
      new Array(getTotalDividingLines(!sliderRange.from ? 5 : 0))
        .fill('')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-shadow
        .map((_, dividingLineIndex) => {
          const dividingTimeStyle =
            dividingLineIndex % 6 === 0 && 'slider-track-dividing-line-long';
          const dividingCountStyle =
            dividingLineIndex % 5 === 0 && 'slider-track-dividing-line-long';

          const dividingLineStyle =
            configurationType === IntervalTimerConfigurationType.COUNT
              ? dividingCountStyle
              : dividingTimeStyle;

          const totalDividingLines = getTotalDividingLines();
          const invertedDividingLineIndex = Math.abs(
            dividingLineIndex - totalDividingLines
          );

          const dividingLineLabel =
            (invertedDividingLineIndex / totalDividingLines) * sliderRange.to;

          return (
            <Box className="position-relative width-full" key={uuidv4()}>
              {dividingLineStyle && (
                <Box className="position-absolute slider-track-dividing-line-label text-size-1-25 text-color-white-dark font-semibold">
                  {dividingLineLabel}
                </Box>
              )}
              <Box
                className={`${dividingLineStyle} slider-track-dividing-line`}
              />
            </Box>
          );
        }),
    [configurationType, getTotalDividingLines, sliderRange.from, sliderRange.to]
  );
  //

  // --- RENDER ---

  return (
    <Box className="position-absolute height-full width-full justify-content-space-between">
      {sliderTrack}
    </Box>
  );
};
