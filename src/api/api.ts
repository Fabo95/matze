import { apiBaseUrl, authBaseUrl } from '@Interval/api/utils/apiConstants';
import {
  FriendshipMessages,
  Interval,
  IntervalIntensityType,
  Login,
  Register,
  User,
} from '@Interval/api/utils/apiTypes';
import { getFetchOptions } from '@Interval/serverAction/utils/serverActionHelpers';
import { HttpMethod } from '@Interval/serverAction/utils/serverActionTypes';

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
}): Promise<any> =>
  fetch(
    `${apiBaseUrl}intervals`,
    getFetchOptions({
      body: { [intensityType]: filteredIntensity },
      method: HttpMethod.PATCH,
    })
  );

export const apiPostLogin = async ({
  email,
  password,
}: {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}): Promise<Login> =>
  fetch(
    `${authBaseUrl}users/login`,
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
    `${authBaseUrl}users/register`,
    getFetchOptions({
      body: { confirmPassword, email, password },
      method: HttpMethod.POST,
    })
  ).then((data) => data.json());

export const apiGetUserByIdOrFromToken = async ({
  userId,
}: {
  userId?: number;
} = {}): Promise<User> =>
  fetch(
    `${authBaseUrl}users${userId ? `?userId=${userId}` : ''}`,
    getFetchOptions()
  ).then((data) => data.json());

export const apiGetFriendshipsMessages = async (): Promise<
  FriendshipMessages[]
> =>
  fetch(`${apiBaseUrl}friendships/messages`, getFetchOptions()).then((data) =>
    data.json()
  );
