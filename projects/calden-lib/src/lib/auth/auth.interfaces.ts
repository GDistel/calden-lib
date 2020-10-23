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

export type AuthContextType = 'login' | 'sign up';
