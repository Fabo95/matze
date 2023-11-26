'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import {
  apiPatchInterval,
  apiPostLogin,
  apiPostRegister,
} from '@Interval/api/api';
import { IntervalIntensityType } from '@Interval/api/utils/apiTypes';
import {
  loginErrorState,
  registerErrorState,
} from '@Interval/serverAction/utils/serverActionConstants';
import { deleteCookie, setCookie } from '@Interval/utils/cookies';
import { LoginError, RegisterError, Page } from '@Interval/utils/types';
import { validateEmail, validatePassword } from '@Interval/utils/validations';

export const handleLogout = async () => {
  await deleteCookie('authToken');

  redirect(`/de/${Page.LOGIN}`);
};

export const apiPatchIntervalServerAction = async ({
  filteredIntensity,
  intensityType,
  path,
}: {
  filteredIntensity?: number;
  intensityType: Exclude<IntervalIntensityType, IntervalIntensityType.USER_ID>;
  path: string | string[];
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
  let authCookie;

  const email = formData.get('email');
  const password = formData.get('password');

  const emailValidationError = validateEmail(email);
  const passwordValidationError = validatePassword(password);

  if (emailValidationError) {
    loginErrorState.setEmailError(emailValidationError as LoginError);
    revalidatePath('/');

    return;
  }

  if (passwordValidationError) {
    loginErrorState.setPasswordError(passwordValidationError as LoginError);
    revalidatePath('/');

    return;
  }

  try {
    const loginResponse = await apiPostLogin({ email, password });

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

    authCookie = await setCookie({
      cookieName: 'authToken',
      httpOnly: true,
      value: loginResponse.authToken,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }

  if (authCookie) {
    redirect(`/de/${Page.HOME}`);
  }
};

export const apiPostRegisterServerAction = async (formData: FormData) => {
  let authCookie;

  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  const emailValidationError = validateEmail(email);
  const passwordValidationError = validatePassword(password, confirmPassword);

  if (emailValidationError) {
    registerErrorState.setEmailError(emailValidationError as RegisterError);
    revalidatePath('/');

    return;
  }

  if (passwordValidationError) {
    registerErrorState.setPasswordError(
      passwordValidationError as RegisterError,
    );
    revalidatePath('/');

    return;
  }

  try {
    const registerResponse = await apiPostRegister({
      confirmPassword,
      email,
      password,
    });

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

    authCookie = await setCookie({
      cookieName: 'authToken',
      httpOnly: true,
      value: registerResponse.authToken,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }

  if (authCookie) {
    redirect(`/de/${Page.HOME}`);
  }
};
