'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { IntervalIntensityType } from 'api/utils/apiTypes';
import { apiPatchInterval, apiPostLogin, apiPostRegister } from 'api/api';
import { redirect } from 'next/navigation';
import { Page } from 'utils/types';
import { registerErrorState } from 'serverAction/utils/serverActionConstants';

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

  let emailValidationError;
  let passwordValidationError;

  if (emailValidationError || passwordValidationError) {
    return;
  }

  try {
    const data = await apiPostLogin({ email, password });

    const loginResponse = await data.json();

    if ('error' in loginResponse) {
      return;
    }

    await cookies().set({
      httpOnly: true,
      name: 'authToken',
      value: loginResponse.authToken,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }

  redirect(`/de/${Page.HOME}`);
};

export const apiPostRegisterServerAction = async (formData: FormData) => {
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  let emailValidationError;
  let passwordValidationError;
  let confirmPasswordValidationError;

  if (emailValidationError) {
    registerErrorState.setEmailError('invalidEmail');
    revalidatePath('/');

    return;
  }

  if (password !== confirmPassword) {
    registerErrorState.setPasswordError('noPasswordMatching');
    revalidatePath('/');
    return;
  }

  if (passwordValidationError || confirmPasswordValidationError) {
    registerErrorState.setPasswordError('invalidPassword');
    revalidatePath('/');

    return;
  }

  try {
    const data = await apiPostRegister({ confirmPassword, email, password });

    const registerResponse = await data.json();

    if ('error' in registerResponse) {
      const registerErrorMethod = registerResponse.error.includes('email')
        ? registerErrorState.setEmailError
        : registerErrorState.setPasswordError;

      registerErrorMethod(registerResponse.error);
      return;
    }

    await cookies().set({
      httpOnly: true,
      name: 'authToken',
      value: registerResponse.authToken,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }

  redirect(`/de/${Page.HOME}`);
};
