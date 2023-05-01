import { useEffect } from 'react';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';

import { IntervalTimerConfigurationType } from 'ui/intervalTimer/utils/intervalTimerTypes';
import { IntervalTimerConfigurationOptionProps } from 'ui/intervalTimer/utils/intervalTimerHelpers';
import { mapIndexToIntensity } from 'utils/helpers';

type UseIntensityPipeProps = {
  handleIntensityChange: (result: number) => void;
  intensitySubject: BehaviorSubject<number>;
} & Pick<IntervalTimerConfigurationOptionProps, 'range' | 'type'>;

export const useIntensityPipe = ({
  handleIntensityChange,
  intensitySubject,
  type,
  range,
}: UseIntensityPipeProps) => {
  // --- EFFECTS ---

  useEffect(() => {
    intensitySubject
      .pipe(
        map((intensity) => {
          if (type === IntervalTimerConfigurationType.COUNT) {
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
  }, [handleIntensityChange, intensitySubject, range.from, range.to, type]);
};
