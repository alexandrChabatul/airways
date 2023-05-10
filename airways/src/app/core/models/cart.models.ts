import { PassengersInterface } from 'src/app/modules/home/models/passenger-types.models';
import { AirportResponseInterface } from './airport-response.interface';

export interface CartItemInterface {
  flightNumber: string;
  origin: AirportResponseInterface;
  destination: AirportResponseInterface;
  type: 'round trip' | 'one way';
  departure: Date;
  arrival?: Date;
  duration: number;
  passengers: PassengersInterface;
  price: number;
}
