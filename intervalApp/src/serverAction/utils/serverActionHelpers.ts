import { cookies } from 'next/headers';

import { HttpMethod } from '@Interval/serverAction/utils/serverActionTypes';

type GetFetchOptions = Omit<RequestInit, 'body'> & {
  body?: { [key: string]: unknown };
  headers?: RequestInit['headers'];
  jwtToken?: string;
  jwtTokenName?: string;
  method?: HttpMethod;
};

export const getFetchOptions = ({
  body,
  cache,
  headers,
  jwtToken,
  jwtTokenName,
  method = HttpMethod.GET,
  ...options
}: GetFetchOptions = {}): RequestInit => ({
  method,
  body: JSON.stringify(body),
  cache: cache || 'no-cache',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${
      jwtToken || cookies().get(jwtTokenName || 'authToken')?.value
    }`,
    ...headers,
  },
  ...options,
});

// eslint-disable-next-line functional/no-classes
export class AtomicState<T> {
  constructor(
    public emailError: T | undefined = undefined,
    public passwordError: T | undefined = undefined,
  ) {}

  setEmailError(message: T) {
    this.emailError = message;
  }

  setPasswordError(message: T) {
    this.passwordError = message;
  }

  getEmailError() {
    const { emailError } = this;
    this.emailError = undefined;
    return emailError;
  }

  getPasswordError() {
    const { passwordError } = this;
    this.passwordError = undefined;
    return passwordError;
  }
}
