import { Box } from 'core/box';
import { Chevron } from 'icons/chevron';
import { IntervalTimerConfigurationOptionProps } from 'blocks/intervalTimer/components/utils/intervalTimerTypes';

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
