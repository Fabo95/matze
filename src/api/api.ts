import { Interval } from 'api/utils/apiTypes';
import { apiBaseUrl } from 'api/utils/apiConstants';

export const apiGetInterval = async (): Promise<Interval> =>
  fetch(`${apiBaseUrl}intervals/32`, {
    cache: 'no-cache',
  }).then((data) => data.json());
