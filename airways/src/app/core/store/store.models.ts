export interface AppStateInterface {
  auth: AuthStateInterface;
}

export interface AuthStateInterface {
  isLoggedIn: boolean;
  username: string | null;
}
