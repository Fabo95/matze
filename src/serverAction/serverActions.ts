'use server';

import { revalidatePath } from 'next/cache';

import { getFetchOptions } from 'serverAction/utils/serverActionHelpers';
import { HttpMethod } from 'serverAction/utils/serverActionTypes';
import { IntervalIntensityType } from 'api/utils/apiTypes';
import { apiBaseUrl } from 'api/utils/apiConstants';

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
      `${apiBaseUrl}intervals/32`,
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
