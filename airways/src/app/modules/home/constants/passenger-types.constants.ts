import { PassengerTypeInterface } from '../models/passenger-types.models';

export const PASSENGER_TYPES: PassengerTypeInterface[] = [
  {
    optionName: 'adults',
    passenger: 'Adults',
    years: '14+ years',
    count: 1,
    isAddAvailable: true,
    isRemoveAvailable: false,
  },
  {
    optionName: 'child',
    passenger: 'Child',
    years: '2-14 years',
    count: 0,
    isAddAvailable: true,
    isRemoveAvailable: false,
  },
  {
    optionName: 'infant',
    passenger: 'Infant',
    years: '0-2 years',
    count: 0,
    isAddAvailable: true,
    isRemoveAvailable: false,
  },
];
