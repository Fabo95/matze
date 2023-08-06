'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { IntervalIntensityType } from 'api/utils/apiTypes';
import { apiPatchInterval, apiPostLogin, apiPostRegister } from 'api/api';
import { redirect } from 'next/navigation';
import { Page } from 'utils/types';
import {
  loginErrorState,
  registerErrorState,
} from 'serverAction/utils/serverActionConstants';
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

  const emailValidationError = validateEmail(email);
  const passwordValidationError = validatePassword(password);

  if (emailValidationError) {
    loginErrorState.setEmailError(emailValidationError);
    revalidatePath('/');

    return;
  }

  if (passwordValidationError) {
    loginErrorState.setPasswordError(passwordValidationError);
    revalidatePath('/');

    return;
  }

  try {
    const data = await apiPostLogin({ email, password });

    const loginResponse = await data.json();

    if ('error' in loginResponse) {
      const isEmailValidationError = loginResponse.type === 'email';

      if (isEmailValidationError) {
        loginErrorState.setEmailError(loginResponse.error);
      }

      if (!isEmailValidationError) {
        loginErrorState.setPasswordError(loginResponse.error);
      }

      revalidatePath('/');

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

  const authCookie = cookies().get('authToken');

  if (authCookie) {
    redirect(`/de/${Page.HOME}`);
  }
};

export const apiPostRegisterServerAction = async (formData: FormData) => {
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  const emailValidationError = validateEmail(email);
  const passwordValidationError = validatePassword(password, confirmPassword);

  if (emailValidationError) {
    registerErrorState.setEmailError(emailValidationError);
    revalidatePath('/');

    return;
  }

  if (passwordValidationError) {
    registerErrorState.setPasswordError(passwordValidationError);
    revalidatePath('/');

    return;
  }

  try {
    const data = await apiPostRegister({ confirmPassword, email, password });

    const registerResponse = await data.json();

    if ('error' in registerResponse) {
      const isEmailValidationError = registerResponse.type === 'email';

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
