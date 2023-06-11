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
