import { Interval } from 'api/utils/apiTypes';
import { apiBaseUrl } from 'api/utils/apiConstants';
import { getFetchOptions } from 'serverAction/utils/serverActionHelpers';

export const apiGetInterval = async (): Promise<Interval> =>
  fetch(`${apiBaseUrl}intervals`, getFetchOptions()).then((data) =>
    data.json()
  );
