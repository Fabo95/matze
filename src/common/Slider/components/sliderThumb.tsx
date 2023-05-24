import { Box } from 'common/box';
import { ChevronUp } from 'icons/chevronUp';
import { ChevronDown } from 'icons/chevronDown';
import { IntervalTimerConfigurationOptionProps } from 'ui/intervalTimer/utils/intervalTimerHelpers';

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

      <ChevronUp className="stroke-gray-dark" />

      <ChevronDown className="stroke-gray-dark" />
    </Box>
  );
};
