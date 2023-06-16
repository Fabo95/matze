'use server';

import { revalidatePath } from 'next/cache';

import { getFetchOptions } from 'serverAction/utils/serverActionHelpers';
import { HttpMethod } from 'serverAction/utils/serverActionTypes';
import { IntervalIntensityType } from 'api/utils/apiTypes';

export const apiPatchIntensity = async ({
  intensityType,
  filteredIntensity,
  path,
}: {
  intensityType: Exclude<IntervalIntensityType, IntervalIntensityType.USER_ID>;
  filteredIntensity?: number;
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
    // eslint-disable-next-line no-console
    console.log(e);
  }
};
