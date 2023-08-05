import { HttpMethod } from 'serverAction/utils/serverActionTypes';
import { cookies } from 'next/headers';
import { ValidationError } from 'utils/types';

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

export class AtomicState {
  constructor(
    public emailError: string | ValidationError | undefined = undefined,
    public passwordError: string | ValidationError | undefined = undefined
  ) {}

  setEmailError(message: string) {
    this.emailError = message;
  }

  setPasswordError(message: string) {
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
