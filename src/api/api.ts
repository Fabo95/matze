import { Interval, IntervalIntensityType } from 'api/utils/apiTypes';
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
}): Promise<any> =>
  fetch(
    `${apiBaseUrl}intervals`,
    getFetchOptions({
      body: { [intensityType]: filteredIntensity },
      method: HttpMethod.PATCH,
    })
  );

export const apiGetAuthTokenValidation = async (
  authToken: string
): Promise<{ status: number }> =>
  fetch(
    `${authBaseUrl}auth`,
    getFetchOptions({
      jwtToken: authToken,
    })
  );

export const apiPostLogin = async ({
  email,
  password,
}: {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}): Promise<Response> =>
  fetch(
    `${authBaseUrl}login`,
    getFetchOptions({
      body: { email, password },
      method: HttpMethod.POST,
    })
  );
