import { User } from '../models/auth-response.interface';
import { CurrencyFormatType, DateFormatType } from '../models/formats.models';
import { OrderInterface } from '../models/order.models';

export interface AppStateInterface {
  authState: AuthStateInterface;
  formats: FormatsStateInterface;
  order: OrderStateInterface;
}

export interface AuthStateInterface {
  accessToken: string | null;
  user: User | null;
  errorMessage?: string | null;
  isAuthenticated: boolean;
}

export interface FormatsStateInterface {
  dateFormat: DateFormatType;
  currencyFormat: CurrencyFormatType;
}

export interface OrderStateInterface extends OrderInterface {
  isLoading: boolean;
}
