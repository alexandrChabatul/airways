import { ExtendedTicketInterface } from './ticket.models';

export interface PassengerInfoInterface {
  firstName: string;
  lastName: string;
  sex: 'Male' | 'Female';
  dateOfBirth: string;
  needAssistance?: boolean;
}

export interface ContactDetailsInterface {
  countryCode: string;
  mobileNumber: string;
  email: string;
}

export interface BookingTicketsUpdateInterface {
  isRound: boolean;
  originName: string;
  destinationName: string;
  queryParams: string;
  ticket: ExtendedTicketInterface;
}