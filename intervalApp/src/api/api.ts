import { apiBaseUrl, authBaseUrl } from "@Interval/api/utils/apiConstants";
import { Friendship, Interval, IntervalIntensityType, Login, Register, User } from "@Interval/api/utils/apiTypes";
import { getFetchOptions } from "@Interval/serverAction/utils/serverActionHelpers";
import { HttpMethod } from "@Interval/serverAction/utils/serverActionTypes";

export const apiGetInterval = async (): Promise<Interval> =>
    fetch(`${apiBaseUrl}intervals`, getFetchOptions()).then((data) => data.json());

export const apiPatchInterval = async ({
    filteredIntensity,
    intensityType,
}: {
    filteredIntensity?: number;
    intensityType: Exclude<IntervalIntensityType, IntervalIntensityType.USER_ID>;
}): Promise<any> =>
    fetch(
        `${apiBaseUrl}intervals`,
        getFetchOptions({
            body: {
                [intensityType]: filteredIntensity,
            },
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
            body: {
                email,
                password,
            },
            method: HttpMethod.POST,
        })
    ).then((data) => data.json());

export const apiPostRegister = async ({
    confirmPassword,
    email,
    password,
}: {
    confirmPassword: FormDataEntryValue | null;
    email: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
}): Promise<Register> =>
    fetch(
        `${authBaseUrl}users/register`,
        getFetchOptions({
            body: {
                confirmPassword,
                email,
                password,
            },
            method: HttpMethod.POST,
        })
    ).then((data) => data.json());

export const apiGetUserByIdOrFromToken = async ({
    userId,
}: {
    userId?: number;
} = {}): Promise<User> =>
    fetch(`${authBaseUrl}users${userId ? `?userId=${userId}` : ""}`, getFetchOptions()).then((data) => data.json());

export const apiGetFriendships = async (): Promise<Friendship[]> =>
    fetch(`${apiBaseUrl}friendships`, getFetchOptions()).then((data) => data.json());
