import { PassengersInterface } from 'src/app/modules/home/models/passenger-types.models';
import { AirportResponseInterface } from './airport-response.interface';

export interface OrderInterface {
  origin: AirportResponseInterface | null;
  destination: AirportResponseInterface | null;
  arrival: Date | null;
  departure: Date | null;
  passengers: PassengersInterface;
}
