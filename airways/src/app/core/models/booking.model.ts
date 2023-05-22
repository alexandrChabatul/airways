import { ExtendedTicketInterface } from './ticket.models';

export interface PassengerInfoInterface {
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female';
  dateOfBirth: Date;
  needAssistance: boolean;
  needBuggage: boolean;
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
