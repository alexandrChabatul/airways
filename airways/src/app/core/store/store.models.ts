import { User } from '../models/auth-response.interface';
import { ContactDetailsInterface, PassengerTypeInfoInterface } from '../models/booking.model';
import { CurrencyFormatType, DateFormatType } from '../models/formats.models';
import { OrderInterface } from '../models/order.models';
import { ExtendedTicketInterface } from '../models/ticket.models';
import { CartItemWithFlagInterface } from '../models/cart.models';

export interface AppStateInterface {
  authState: AuthStateInterface;
  formats: FormatsStateInterface;
  order: OrderStateInterface;
  cart: CartStateInterface;
  history: CartStateInterface;
  tickets: TicketsStateInterface;
  booking: BookingStateInterface;
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

export interface TicketsStateInterface {
  data: ExtendedTicketInterface[];
  dataBack: ExtendedTicketInterface[];
  isLoading: boolean;
}

export interface BookingStateInterface {
  order: {
    isRound: boolean;
    originName: string;
    destinationName: string;
    ticket: ExtendedTicketInterface | null;
    ticketBack?: ExtendedTicketInterface | null;
    queryParams: string;
    isValid: boolean;
  };
  passengers: {
    adult: PassengerTypeInfoInterface | null;
    child: PassengerTypeInfoInterface | null;
    infant: PassengerTypeInfoInterface | null;
    contactDetails: ContactDetailsInterface;
  };
}

export interface CartStateInterface {
  items: CartItemWithFlagInterface[] | null;
}

export interface HistoryStateInterface {
  items: CartItemWithFlagInterface[] | null;
}

export interface TicketsStateInterface {
  data: ExtendedTicketInterface[];
  dataBack: ExtendedTicketInterface[];
  isLoading: boolean;
}
