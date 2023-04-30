import { useEffect } from 'react';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';

import { IntervalTimerConfigurationType } from 'ui/intervalTimer/utils/intervalTimerTypes';
import { IntervalTimerConfigurationOptionProps } from 'ui/intervalTimer/utils/intervalTimerHelpers';

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
        map((changedIntensity) => {
          if (type === IntervalTimerConfigurationType.COUNT) {
            return Math.round(changedIntensity);
          }

          const roundingNumber = 5;
          const rest = changedIntensity % roundingNumber;

          if (rest <= roundingNumber / 2) {
            return changedIntensity - rest;
          }

          return changedIntensity + (roundingNumber - rest);
        }),

        distinctUntilChanged(
          (prevIntensity, currentIntensity) =>
            currentIntensity === prevIntensity
        ),

        map((changedIntensity) => {
          if (changedIntensity < range.from) {
            return range.from;
          }

          return changedIntensity;
        })
      )
      .subscribe({
        next: (result) => {
          handleIntensityChange(result);
        },
      });
  }, [handleIntensityChange, intensitySubject, range.from, range.to, type]);
};
