import { CurrencyFormatType, DateFormatType } from '../models/formats.models';
import { OrderInterface } from '../models/order.models';

export interface AppStateInterface {
  auth: AuthStateInterface;
  formats: FormatsStateInterface;
  order: OrderStateInterface;
}

export interface AuthStateInterface {
  isLoggedIn: boolean;
  username: string | null;
}

export interface FormatsStateInterface {
  dateFormat: DateFormatType;
  currencyFormat: CurrencyFormatType;
}

export interface OrderStateInterface extends OrderInterface {
  isLoading: boolean;
}
