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
    <Box
      className="position-absolute z-index-10 slider-thumb align-items-center background-white-dark border-radius-full justify-center"
      style={{ bottom: `${translateYOffset}` }}
    >
      <Box className="position-absolute slider-thumb-line" />

      <ChevronUp className="stroke-gray-dark" />

      <ChevronDown className="stroke-gray-dark" />
    </Box>
  );
};
