import { CurrencyFormatType, DateFormatType } from '../models/formats.models';
import { User } from './action-types/auth.action-types';
import { OrderInterface } from '../models/order.models';

export interface AppStateInterface {
  authState: AuthStateInterface;
  formats: FormatsStateInterface;
  order: OrderStateInterface;
}

export interface AuthStateInterface {
  accessToken: string | null;
  user: User | null;
  loginError?: string | null;
  isAuthenticated: boolean;
}

export interface FormatsStateInterface {
  dateFormat: DateFormatType;
  currencyFormat: CurrencyFormatType;
}

export interface OrderStateInterface extends OrderInterface {
  isLoading: boolean;
}
