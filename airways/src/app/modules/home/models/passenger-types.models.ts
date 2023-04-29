export interface PassengerTypeInterface {
  optionName: 'adults' | 'child' | 'infant';
  passenger: string;
  years: string;
  count: number;
  isAddAvailable: boolean;
  isRemoveAvailable: boolean;
}

export interface PassengersInterface {
  adults: number;
  child: number;
  infant: number;
}
