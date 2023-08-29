import { AtomicState } from 'serverAction/utils/serverActionHelpers';
import {
  LoginError,
  RegisterError,
} from 'serverAction/utils/serverActionTypes';

export const registerErrorState = new AtomicState<RegisterError>();

export const loginErrorState = new AtomicState<LoginError>();
