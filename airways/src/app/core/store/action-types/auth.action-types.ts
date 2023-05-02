export enum AuthActionTypes {
  LOGIN_REQUEST = '[Auth] Login request',
  LOGIN_SUCCESS = '[Auth] Login success',
  LOGIN_FAILURE = '[Auth] Login failure',
}

export interface AuthLoginResponse {
  accessToken: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
}
