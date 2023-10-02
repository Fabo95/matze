import * as process from 'process';

export const apiBaseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/'
    : 'https://api.wolkenassistent.de/';

export const authBaseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8090/'
    : 'https://auth.wolkenassistent.de/';
