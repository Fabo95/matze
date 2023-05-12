'use server';

import { revalidatePath } from 'next/cache';

import { getFetchOptions } from 'serverAction/utils/serverActionHelpers';
import { HttpMethod } from 'serverAction/utils/serverActionTypes';
import { IntervalTimerIntensityType } from 'ui/intervalTimer/utils/intervalTimerTypes';

export const apiPatchIntensity = async ({
  intensityType,
  filteredIntensity,
  path,
}: {
  intensityType: IntervalTimerIntensityType;
  filteredIntensity: number;
  path: string;
}) => {
  try {
    await fetch(
      'http://localhost:8080/intervals',
      getFetchOptions({
        body: { [intensityType]: filteredIntensity },
        method: HttpMethod.PATCH,
      })
    );

    revalidatePath(`/${path}`);
  } catch (e) {
    console.log(e);
  }
};
