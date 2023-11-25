import { IntervalTimerConfigurationOptionProps } from '@Interval/components/blocks/intervalTimer/components/utils/intervalTimerTypes';
import { Box } from '@Interval/components/core/box';
import { Chevron } from '@Interval/components/icons/chevron';

export const SliderThumb = ({
  intensity,
  sliderRange,
}: Pick<
  IntervalTimerConfigurationOptionProps,
  'intensity' | 'sliderRange'
>) => {
  // --- HELPERS ----

  const translateYOffset = `${
    ((intensity - sliderRange.from) / (sliderRange.to - sliderRange.from)) * 100
  }%`;

  // --- RENDER ---
  return (
    <Box className="slider-thumb" style={{ bottom: `${translateYOffset}` }}>
      <Box className="slider-thumb-line" />

      <Chevron className="stroke-gray-dark" direction="up" />

      <Chevron className="stroke-gray-dark" direction="down" />
    </Box>
  );
};
