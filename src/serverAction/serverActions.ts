'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { RedirectType } from 'next/dist/client/components/redirect';

import { IntervalIntensityType } from 'api/utils/apiTypes';
import { validateEmail, validatePassword } from 'utils/validations';
import { Page } from 'utils/types';
import { apiPatchInterval, apiPostLogin } from 'api/api';

export const apiPatchIntervalServerAction = async ({
  intensityType,
  filteredIntensity,
  path,
}: {
  intensityType: Exclude<IntervalIntensityType, IntervalIntensityType.USER_ID>;
  filteredIntensity?: number;
  path: string;
}) => {
  try {
    await apiPatchInterval({ filteredIntensity, intensityType });

    revalidatePath(`/${path}`);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export const apiPostLoginServerAction = async (formData: FormData) => {
  const email = formData.get('email');
  const password = formData.get('password');

  const emailValidationError = validateEmail(email);
  const passwordValidationError = validatePassword(password);

  if (!emailValidationError && !passwordValidationError) {
    try {
      const data = await apiPostLogin({ email, password });

      const { authToken } = await data.json();

      cookies().set({
        httpOnly: true,
        name: 'authToken',
        value: authToken,
      });

      redirect(`/de/${Page.HOME}`, RedirectType.replace);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }
};
