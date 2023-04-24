export interface AppStateInterface {
  auth: AuthStateInterface;
}

export interface AuthStateInterface {
  isLoggedIn: boolean;
  username: string | null;
}

export interface FormatsStateInterface {
  dateFormat: string;
  currencyFormat: string;
}