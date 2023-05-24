import { User } from '../models/auth-response.interface';
import {
  ContactDetailsInterface,
  PassengerInfoInterface,
  PassengerTypeInfoInterface,
} from '../models/booking.model';
import { CurrencyFormatType, DateFormatType } from '../models/formats.models';
import { OrderInterface } from '../models/order.models';
import { ExtendedTicketInterface } from '../models/ticket.models';

export interface AppStateInterface {
  authState: AuthStateInterface;
  formats: FormatsStateInterface;
  order: OrderStateInterface;
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
