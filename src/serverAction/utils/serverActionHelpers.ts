import { HttpMethod } from 'serverAction/utils/serverActionTypes';
import { cookies } from 'next/headers';

type GetFechtOptions = Omit<RequestInit, 'body'> & {
  body?: { [key: string]: unknown };
  method?: HttpMethod;
  jwt?: string;
};

export const getFetchOptions = ({
  body,
  cache,
  jwt,
  method = HttpMethod.GET,
  ...options
}: GetFechtOptions = {}): RequestInit => ({
  body: JSON.stringify(body),
  cache: cache || 'no-cache',
  headers: {
    Authorization: `Bearer ${cookies().get(jwt || 'jwtToken')?.value}`,
    'Content-Type': 'application/json',
  },
  method,
  ...options,
});
