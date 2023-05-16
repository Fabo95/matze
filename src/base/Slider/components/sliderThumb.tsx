import { Box } from 'base/box';
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
      className="h absolute z-10 h-11 w-16 translate-y-[50%] items-center justify-center rounded-full bg-white-full"
      style={{ bottom: `${translateYOffset}` }}
    >
      <Box className="absolute top-1/2 h-2 w-80 translate-y-[-50%] bg-gradient-to-r from-white-op-0 via-white-full to-white-op-0" />

      <ChevronUp className="stroke-gray-dark" />

      <ChevronDown className="stroke-gray-dark" />
    </Box>
  );
};
