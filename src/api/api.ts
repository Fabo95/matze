import { Interval } from 'api/utils/apiTypes';

export const apiGetInterval = async (): Promise<Interval> =>
  fetch(`${process.env.API_BASE_URL}intervals`, {
    cache: 'no-cache',
  }).then((data) => data.json());
