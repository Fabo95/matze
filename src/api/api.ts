import { Interval } from 'api/utils/apiTypes';

export const apiGetInterval = async (): Promise<Interval> =>
  fetch('https://interval-app-api.up.railway.app/intervals', {
    cache: 'no-cache',
  }).then((data) => data.json());
