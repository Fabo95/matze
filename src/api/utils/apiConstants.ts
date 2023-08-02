export const apiBaseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/'
    : 'https://interval-app-api.onrender.com/';

export const authBaseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8090/'
    : 'https://interval-app-auth.onrender.com/';
