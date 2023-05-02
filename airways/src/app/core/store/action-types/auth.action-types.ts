export enum AuthActionTypes {
  LOGIN_REQUEST = '[Auth] Login request',
  LOGIN_SUCCESS = '[Auth] Login success',
  LOGIN_FAILURE = '[Auth] Login failure',

  SIGNUP_REQUEST = '[Auth] Signup request',
  SIGNUP_SUCCESS = '[Auth] Signup success',
}

export interface AuthLoginResponse {
  accessToken: string;
  user: User;
}

export interface AuthSignupResponse {
  accessToken: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
}
