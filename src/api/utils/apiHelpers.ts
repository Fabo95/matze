import { HttpMethod } from 'api/utils/apiTypes';

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
