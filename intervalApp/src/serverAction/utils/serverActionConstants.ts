import { AtomicState } from "@Interval/serverAction/utils/serverActionHelpers";
import { LoginError, RegisterError } from "@Interval/utils/types";

export const registerErrorState = new AtomicState<RegisterError>();

export const loginErrorState = new AtomicState<LoginError>();
