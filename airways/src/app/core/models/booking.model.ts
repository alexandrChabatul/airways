import { ExtendedTicketInterface } from './ticket.models';

export interface PassengerInfoInterface {
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female';
  dateOfBirth: Date;
  needAssistance: boolean;
  needBuggage: boolean;
}

export interface PassengerArrayInterface extends PassengerInfoInterface {
  type: 'adult' | 'child' | 'infant';
}

export interface PassengerTypeInfoInterface {
  [key: string]: PassengerInfoInterface;
}

export interface ContactDetailsInterface {
  country: string;
  tel: string;
  email: string;
}

export interface BookingTicketsUpdateInterface {
  isRound: boolean;
  originName: string;
  destinationName: string;
  queryParams: string;
  ticket: ExtendedTicketInterface;
}
