'use server';

import { getFetchOptions } from 'api/utils/apiHelpers';
import { HttpMethod } from 'api/utils/apiTypes';
import { IntervalTimerIntensityType } from 'ui/intervalTimer/utils/intervalTimerTypes';

export const apiPatchIntensity = async ({
  intensityType,
  filteredIntensity,
}: {
  intensityType: IntervalTimerIntensityType;
  filteredIntensity: number;
}) => {
  try {
    await fetch(
      'http://localhost:8080/intervals',
      getFetchOptions({
        body: { [intensityType]: filteredIntensity },
        method: HttpMethod.PATCH,
      })
    );
  } catch (e) {
    console.log(e);
  }
};
