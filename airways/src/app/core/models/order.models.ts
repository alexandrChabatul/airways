import { PassengersInterface } from 'src/app/modules/home/models/passenger-types.models';
import { AirportResponseInterface } from './airport-response.interface';

export interface OrderInterface {
  origin: AirportResponseInterface | null;
  destination: AirportResponseInterface | null;
  arrival: string | null;
  departure: string | null;
  passengers: PassengersInterface;
  isRound: boolean;
}
