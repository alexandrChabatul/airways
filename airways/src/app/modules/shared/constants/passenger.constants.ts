import { PassengersInterface, PassengerTypeInterface } from '../models/passenger-types.models';

export const PASSENGER_TYPES: PassengerTypeInterface[] = [
  {
    optionName: 'adults',
    passenger: 'Adults',
    years: '14+ years',
    isAddAvailable: true,
    isRemoveAvailable: false,
  },
  {
    optionName: 'child',
    passenger: 'Child',
    years: '2-14 years',
    isAddAvailable: true,
    isRemoveAvailable: false,
  },
  {
    optionName: 'infant',
    passenger: 'Infant',
    years: '0-2 years',
    isAddAvailable: true,
    isRemoveAvailable: false,
  },
];

export const DEFAULT_PASSENGERS: PassengersInterface = {
  adults: 1,
  child: 0,
  infant: 0,
};
