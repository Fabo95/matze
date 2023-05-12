'use server';

import { getFetchOptions } from 'serverAction/utils/serverActionHelpers';
import { HttpMethod } from 'serverAction/utils/serverActionTypes';
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
