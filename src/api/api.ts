import { Interval } from 'api/utils/apiTypes';

export const apiGetInterval = async (): Promise<Interval> =>
  fetch('http://localhost:8080/intervals', { cache: 'no-cache' }).then((data) =>
    data.json()
  );
