export interface PassengerTypeInterface {
  optionName: PassengersOptionNamesType;
  passenger: string;
  years: string;
  isAddAvailable: boolean;
  isRemoveAvailable: boolean;
}

export interface PassengersInterface {
  adults: number;
  child: number;
  infant: number;
}

export type PassengersOptionNamesType = 'adults' | 'child' | 'infant';
