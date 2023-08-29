export const apiBaseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://192.168.0.156/api/'
    : 'http://192.168.0.156/api/';

export const authBaseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://192.168.0.156/auth/'
    : 'http://192.168.0.156/auth/';
