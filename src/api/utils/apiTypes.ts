import { LoginError, RegisterError } from 'utils/types';

export type Interval = {
  [IntervalIntensityType.USER_ID]: number;
  [IntervalIntensityType.WORK_TIME]: number;
  [IntervalIntensityType.REST_TIME]: number;
  [IntervalIntensityType.EXERCISE_COUNT]: number;
  [IntervalIntensityType.ROUND_COUNT]: number;
  [IntervalIntensityType.ROUND_RESET_TIME]: number;
};

export enum IntervalIntensityType {
  USER_ID = 'userId',
  WORK_TIME = 'workTime',
  REST_TIME = 'restTime',
  EXERCISE_COUNT = 'exerciseCount',
  ROUND_COUNT = 'roundCount',
  ROUND_RESET_TIME = 'roundResetTime',
}

export type User = {
  userId: number;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export type Friendship = {
  friendshipId: number;
  userId: number;
  friendId: number;
  createdAt: string;
  updatedAt: string;
};

export type Login =
  | {
      authToken: string;
    }
  | { type: 'email' | 'server'; error: LoginError };

export type Register =
  | {
      authToken: string;
    }
  | { type: 'email' | 'server'; error: RegisterError };
