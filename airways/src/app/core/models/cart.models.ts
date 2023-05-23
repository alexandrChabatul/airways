import { PassengersInterface } from 'src/app/modules/home/models/passenger-types.models';
import { AirportResponseInterface } from './airport-response.interface';

export interface CartItemInterface {
  flightNumber_to: string;
  flightNumber_from?: string;
  origin: AirportResponseInterface;
  destination: AirportResponseInterface;
  type: 'round trip' | 'one way';
  departure_at: string;
  arrival_at?: string;
  duration_to: number;
  duration_from?: number;
  passengers: PassengersInterface;
  price: number;
  destinationUtcOffset: string;
  utcOffset: string;
}
