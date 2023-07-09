import { HttpMethod } from 'serverAction/utils/serverActionTypes';
import { cookies } from 'next/headers';

type GetFetchOptions = Omit<RequestInit, 'body'> & {
  body?: { [key: string]: unknown };
  method?: HttpMethod;
  jwtTokenName?: string;
  jwtToken?: string;
  headers?: RequestInit['headers'];
};

export const getFetchOptions = ({
  body,
  cache,
  jwtToken,
  jwtTokenName,
  headers,
  method = HttpMethod.GET,
  ...options
}: GetFetchOptions = {}): RequestInit => ({
  body: JSON.stringify(body),
  cache: cache || 'no-cache',
  headers: {
    Authorization: `Bearer ${
      jwtToken || cookies().get(jwtTokenName || 'authToken')?.value
    }`,
    'Content-Type': 'application/json',
    ...headers,
  },
  method,
  ...options,
});
