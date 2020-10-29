export interface Credentials {
  username: string;
  access: string;
  refresh: string;
}

export interface AuthRequest{
  context: AuthContextType;
  username: string;
  password: string;
  remember: boolean;
}

export interface AuthConfigUrls {
  token: string;
  refreshToken: string;
  logoutRedirect: string;
  authGuardRedirect: string;
}

export type AuthContextType = 'login' | 'sign up';
