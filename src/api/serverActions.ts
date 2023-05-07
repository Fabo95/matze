'use server';

import { getFetchOptions } from 'api/utils/apiHelpers';
import { HttpMethod } from 'api/utils/apiTypes';
import { IntervalTimerIntensityType } from 'ui/intervalTimer/utils/intervalTimerTypes';
import { revalidatePath, revalidateTag } from 'next/cache';

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

    revalidateTag('312312312312312312');
  } catch (e) {
    console.log(e);
  }
};
