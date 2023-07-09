'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { getFetchOptions } from 'serverAction/utils/serverActionHelpers';
import { HttpMethod } from 'serverAction/utils/serverActionTypes';
import { IntervalIntensityType } from 'api/utils/apiTypes';
import { apiBaseUrl } from 'api/utils/apiConstants';
import { validateEmail, validatePassword } from 'utils/validations';

export const apiPatchIntervals = async ({
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
      `${apiBaseUrl}intervals`,
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

export const apiPostLogin = async (formData: FormData) => {
  const email = formData.get('email');
  const password = formData.get('password');

  const emailValidationError = validateEmail(email);
  const passwordValidationError = validatePassword(password);

  if (!emailValidationError && !passwordValidationError) {
    try {
      const data = await fetch(
        `${apiBaseUrl}login`,
        getFetchOptions({
          body: { email, password },
          method: HttpMethod.POST,
        })
      );

      const { jwtToken } = await data.json();

      cookies().set({
        httpOnly: true,
        name: 'jwtToken',
        value: jwtToken,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }
};
