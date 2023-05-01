import { PassengersInterface } from 'src/app/modules/home/models/passenger-types.models';
import { AirportResponseInterface } from '../models/airport-response.interface';
import { CurrencyFormatType, DateFormatType } from '../models/formats.models';

export interface AppStateInterface {
  auth: AuthStateInterface;
  formats: FormatsStateInterface;
  order: OrderStateInterface;
}

export interface AuthStateInterface {
  isLoggedIn: boolean;
  username: string | null;
}

export interface FormatsStateInterface {
  dateFormat: DateFormatType;
  currencyFormat: CurrencyFormatType;
}

export interface OrderStateInterface {
  origin: AirportResponseInterface | null;
  destination: AirportResponseInterface | null;
  departure: string | null;
  arrival: string | null;
  passengers: PassengersInterface;
  isLoading: boolean;
}
