import { Interval } from 'api/utils/apiTypes';

export const apiGetInterval = async (): Promise<Interval> =>
  fetch('http://localhost:8080/intervals').then((data) => data.json());
