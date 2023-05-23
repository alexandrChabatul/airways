import { User } from '../models/auth-response.interface';
import { CurrencyFormatType, DateFormatType } from '../models/formats.models';
import { OrderInterface } from '../models/order.models';
import { ExtendedTicketInterface } from '../models/ticket.models';
import { CartItemInterface } from '../models/cart.models';

export interface AppStateInterface {
  authState: AuthStateInterface;
  formats: FormatsStateInterface;
  order: OrderStateInterface;
  tickets: TicketsStateInterface;
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
  exchangeRates: number;
}

export interface OrderStateInterface extends OrderInterface {
  isLoading: boolean;
}

export interface CartStateInterface {
  items: CartItemInterface[] | null;
}

export interface TicketsStateInterface {
  data: ExtendedTicketInterface[];
  dataBack: ExtendedTicketInterface[];
  isLoading: boolean;
}
