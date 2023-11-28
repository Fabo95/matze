import { LoginError, RegisterError } from "@Interval/utils/types";

type RecordMetadata = {
    createdAt: string;
    updatedAt: string;
};

export type Interval = {
    [IntervalIntensityType.EXERCISE_COUNT]: number;
    [IntervalIntensityType.REST_TIME]: number;
    [IntervalIntensityType.ROUND_COUNT]: number;
    [IntervalIntensityType.ROUND_RESET_TIME]: number;
    [IntervalIntensityType.USER_ID]: number;
    [IntervalIntensityType.WORK_TIME]: number;
} & RecordMetadata;

export enum IntervalIntensityType {
    EXERCISE_COUNT = "exerciseCount",
    REST_TIME = "restTime",
    ROUND_COUNT = "roundCount",
    ROUND_RESET_TIME = "roundResetTime",
    USER_ID = "userId",
    WORK_TIME = "workTime",
}

export type User = {
    email: string;
    nickname: string;
    password: string;
    userId: number;
} & RecordMetadata;

export type FriendshipMessages = {
    friendId: number;
    friendshipId: number;
    friendshipMessages: Message[];
    userA: User;
    userB: User;
    userId: number;
} & RecordMetadata;

export type Message = {
    content: string;
    friendshipId: number;
    messageId: number;
    receiverUserId: number;
    senderUserId: number;
} & RecordMetadata;

export type Login =
    | {
          authToken: string;
      }
    | {
          error: LoginError;
          type: "email" | "server";
      };

export type Register =
    | {
          authToken: string;
      }
    | {
          error: RegisterError;
          type: "email" | "server";
      };
