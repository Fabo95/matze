import { HttpMethod } from 'serverAction/utils/serverActionTypes';

type GetFechtOptions = Omit<RequestInit, 'body'> & {
  body: { [key: string]: unknown };
  method: HttpMethod;
};

export const getFetchOptions = ({
  body,
  method,
  ...options
}: GetFechtOptions) => ({
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
  method,
  ...options,
});
