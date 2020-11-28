import { CaldenAuthConfig } from './auth.config';

export const mockAuthConfig: CaldenAuthConfig = {
  urls: {
    token: 'token/',
    refreshToken: 'token/refresh/',
    authGuardRedirect: '/auth-async',
    logoutRedirect: ''
  }
};
