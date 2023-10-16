import { LoginError, RegisterError } from 'utils/types';

type RecordMetadata = { createdAt: string; updatedAt: string };

export type Interval = {
  [IntervalIntensityType.USER_ID]: number;
  [IntervalIntensityType.WORK_TIME]: number;
  [IntervalIntensityType.REST_TIME]: number;
  [IntervalIntensityType.EXERCISE_COUNT]: number;
  [IntervalIntensityType.ROUND_COUNT]: number;
  [IntervalIntensityType.ROUND_RESET_TIME]: number;
} & RecordMetadata;

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
  nickname: string;
} & RecordMetadata;

export type FriendshipMessages = {
  friendshipId: number;
  userId: number;
  friendId: number;
  userA: User;
  userB: User;
  friendshipMessages: Message[];
} & RecordMetadata;

export type Message = {
  messageId: number;
  senderUserId: number;
  receiverUserId: number;
  content: string;
  friendshipId: number;
} & RecordMetadata;

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
