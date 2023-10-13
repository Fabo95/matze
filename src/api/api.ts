import {
  Friendship,
  Interval,
  IntervalIntensityType,
  Login,
  Register,
  User,
} from 'api/utils/apiTypes';
import { apiBaseUrl, authBaseUrl } from 'api/utils/apiConstants';
import { getFetchOptions } from 'serverAction/utils/serverActionHelpers';
import { HttpMethod } from 'serverAction/utils/serverActionTypes';

export const apiGetInterval = async (): Promise<Interval> =>
  fetch(`${apiBaseUrl}intervals`, getFetchOptions()).then((data) =>
    data.json()
  );

export const apiPatchInterval = async ({
  intensityType,
  filteredIntensity,
}: {
  intensityType: Exclude<IntervalIntensityType, IntervalIntensityType.USER_ID>;
  filteredIntensity?: number;
}): Promise<number> =>
  fetch(
    `${apiBaseUrl}intervals`,
    getFetchOptions({
      body: { [intensityType]: filteredIntensity },
      method: HttpMethod.PATCH,
    })
  ).then((data) => data.json());

export const apiPostLogin = async ({
  email,
  password,
}: {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}): Promise<Login> =>
  fetch(
    `${authBaseUrl}login`,
    getFetchOptions({
      body: { email, password },
      method: HttpMethod.POST,
    })
  ).then((data) => data.json());

export const apiPostRegister = async ({
  email,
  password,
  confirmPassword,
}: {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  confirmPassword: FormDataEntryValue | null;
}): Promise<Register> =>
  fetch(
    `${authBaseUrl}register`,
    getFetchOptions({
      body: { confirmPassword, email, password },
      method: HttpMethod.POST,
    })
  ).then((data) => data.json());

export const apiGetUser = async (): Promise<User> =>
  fetch(`${authBaseUrl}user`, getFetchOptions()).then((data) => data.json());

export const apiGetFriendships = async (): Promise<Friendship[]> =>
  fetch(`${apiBaseUrl}friendships`, getFetchOptions()).then((data) =>
    data.json()
  );
