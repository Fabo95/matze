export const apiBaseUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8080/'
    : 'https://interval-app-api.up.railway.app/';
