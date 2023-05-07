import { useEffect } from 'react';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';

import { IntervalTimerConfigurationType } from 'ui/intervalTimer/utils/intervalTimerTypes';
import { IntervalTimerConfigurationOptionProps } from 'ui/intervalTimer/utils/intervalTimerHelpers';

type UseIntensityPipeProps = {
  handleIntensityChange: (result: number) => void;
  intensitySubject: BehaviorSubject<number>;
} & Pick<
  IntervalTimerConfigurationOptionProps,
  'sliderRange' | 'configurationType'
>;

export const useIntensityPipe = ({
  handleIntensityChange,
  intensitySubject,
  configurationType,
  sliderRange,
}: UseIntensityPipeProps) => {
  // --- EFFECTS ---

  useEffect(() => {
    intensitySubject
      .pipe(
        map((intensity) => {
          if (configurationType === IntervalTimerConfigurationType.COUNT) {
            return Math.round(intensity);
          }

          const roundingNumber = 5;
          const rest = intensity % roundingNumber;

          if (rest < roundingNumber / 2) {
            return intensity - rest;
          }

          return intensity + (roundingNumber - rest);
        }),

        distinctUntilChanged((prevIntensity, currentIntensity) => {
          return currentIntensity === prevIntensity;
        })
      )
      .subscribe({
        next: (result) => {
          handleIntensityChange(result);
        },
      });
  }, [
    handleIntensityChange,
    intensitySubject,
    sliderRange.from,
    sliderRange.to,
    configurationType,
  ]);
};
