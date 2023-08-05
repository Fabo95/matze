'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { IntervalIntensityType } from 'api/utils/apiTypes';
import { apiPatchInterval, apiPostLogin, apiPostRegister } from 'api/api';
import { redirect } from 'next/navigation';
import { Page, ValidationError } from 'utils/types';
import { registerErrorState } from 'serverAction/utils/serverActionConstants';
import { validateEmail, validatePassword } from 'utils/validations';

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

  const emailValidationError = validateEmail(email);
  const passwordValidationError = validatePassword(password);
  const confirmPasswordValidationError = validatePassword(password);

  if (emailValidationError) {
    registerErrorState.setEmailError(ValidationError.INVALID_EMAIL);
    revalidatePath('/');

    return;
  }

  if (password !== confirmPassword) {
    registerErrorState.setPasswordError(ValidationError.NON_MATCHING_PASSWORD);
    revalidatePath('/');
    return;
  }

  if (passwordValidationError || confirmPasswordValidationError) {
    registerErrorState.setPasswordError(ValidationError.INVALID_PASSWORD);
    revalidatePath('/');

    return;
  }

  try {
    const data = await apiPostRegister({ confirmPassword, email, password });

    const registerResponse = await data.json();

    if ('error' in registerResponse) {
      const isEmailValidationError = registerResponse.error.includes('email');

      if (isEmailValidationError) {
        registerErrorState.setEmailError(registerResponse.error);
      }

      if (!isEmailValidationError) {
        registerErrorState.setPasswordError(registerResponse.error);
      }

      revalidatePath('/');

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

  const authCookie = cookies().get('authToken');

  if (authCookie) {
    redirect(`/de/${Page.HOME}`);
  }
};
