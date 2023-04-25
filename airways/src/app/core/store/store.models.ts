import { CurrencyFormatType, DateFormatType } from '../models/formats.models';

export interface AppStateInterface {
  auth: AuthStateInterface;
  formats: FormatsStateInterface;
}

export interface AuthStateInterface {
  isLoggedIn: boolean;
  username: string | null;
}

export interface FormatsStateInterface {
  dateFormat: DateFormatType;
  currencyFormat: CurrencyFormatType;
}
