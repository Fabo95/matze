import { ValidationError } from 'utils/types';

export const enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  HEAD = 'HEAD',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  OPTIONS = 'OPTIONS',
  CONNECT = 'CONNECT',
  TRACE = 'TRACE',
}

export type RegisterError = Exclude<
  ValidationError,
  'missingUser' | 'incorrectPassword'
>;

export type LoginError = Exclude<
  ValidationError,
  'requiredConfirmPassword' | 'nonMatchingPassword' | 'existingEmail'
>;
