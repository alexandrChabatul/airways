export interface TicketInterface {
  airline: string;
  departure_at: string;
  destination: string;
  destination_airport: string;
  duration: number; //in minutes
  duration_back: number;
  duration_to: number;
  flight_number: string;
  link: string;
  origin: string;
  origin_airport: string;
  price: number;
  return_transfers: number;
  transfers: number;
}

export interface ExtendedTicketInterface extends TicketInterface {
  index: number;
  isActive: boolean;
  utcOffset: string;
  isOutdated: boolean;
  seats: number;
  maxSeats: number;
}
