import { CurrencyFormatType, DateFormatType } from '../models/formats.models';
import { User } from './action-types/auth.action-types';

export interface AppStateInterface {
  authState: AuthStateInterface;
  formats: FormatsStateInterface;
}

export interface AuthStateInterface {
  token: string | null;
  user: User | null;
  loginError?: string | null;
  isAuthenticated: boolean;
}

export interface FormatsStateInterface {
  dateFormat: DateFormatType;
  currencyFormat: CurrencyFormatType;
}
