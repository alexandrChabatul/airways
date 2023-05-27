import { ExtendedTicketInterface } from './ticket.models';
import { ContactDetailsInterface, PassengerTypeInfoInterface } from './booking.model';

export interface CartItemInterface {
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
  totalPrice: number;
}

export interface CartItemWithFlagInterface extends CartItemInterface {
  isActive: boolean;
}
