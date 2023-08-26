import { AtomicState } from 'serverAction/utils/serverActionHelpers';
import { ValidationError } from 'utils/types';

export const registerErrorState = new AtomicState<
  Exclude<ValidationError, 'missingUser' | 'incorrectPassword'>
>();

export const loginErrorState = new AtomicState<
  Exclude<
    ValidationError,
    'requiredConfirmPassword' | 'nonMatchingPassword' | 'existingEmail'
  >
>();
