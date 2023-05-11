import { TicketInterface } from './ticket.models';

export interface TicketsResponseInterface {
  currency: string;
  success: boolean;
  data: {
    [key: string]: TicketInterface;
  };
}
