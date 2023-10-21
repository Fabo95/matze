import React, { useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Box } from 'core/box';
import {
  IntervalTimerConfigurationType,
  IntervalTimerConfigurationOptionProps,
} from 'blocks/intervalTimer/components/utils/intervalTimerTypes';
import { getArrayWithElements } from 'utils/helpers';

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
      getArrayWithElements({
        arrayElement: '',
        arrayLength: getTotalDividingLines(!sliderRange.from ? 5 : 0),
      })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-shadow
        .map((_, dividingLineIndex) => {
          const dividingTimeClassName =
            dividingLineIndex % 6 === 0 && 'slider-track-dividing-line-long';
          const dividingCountClassName =
            dividingLineIndex % 5 === 0 && 'slider-track-dividing-line-long';

          const dividingLineClassName =
            configurationType === IntervalTimerConfigurationType.COUNT
              ? dividingCountClassName
              : dividingTimeClassName;

          const totalDividingLines = getTotalDividingLines();
          const invertedDividingLineIndex = Math.abs(
            dividingLineIndex - totalDividingLines
          );

          const dividingLineLabel =
            (invertedDividingLineIndex / totalDividingLines) * sliderRange.to;

          return (
            <Box
              className="slider-track-dividing-line-container"
              key={uuidv4()}
            >
              {dividingLineClassName && (
                <Box className="slider-track-dividing-line-label">
                  {dividingLineLabel}
                </Box>
              )}
              <Box
                className={`${dividingLineClassName} slider-track-dividing-line`}
              />
            </Box>
          );
        }),
    [configurationType, getTotalDividingLines, sliderRange.from, sliderRange.to]
  );
  //

  // --- RENDER ---

  return <Box className="slider-track">{sliderTrack}</Box>;
};
