export const apiBaseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://interval-app-api.up.railway.app/'
    : 'http://localhost:8080/';
