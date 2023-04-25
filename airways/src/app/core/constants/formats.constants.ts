import { CurrencyFormatInterface, DateFormatInterface } from '../models/formats.models';

export const DATE_FORMATS: DateFormatInterface[] = [
  { value: 'MM/dd/yyyy', viewValue: 'MM/DD/YYYY' },
  { value: 'dd/MM/yyyy', viewValue: 'DD/MM/YYYY' },
  { value: 'yyyy/dd/MM', viewValue: 'YYYY/DD/MM' },
  { value: 'yyyy/MM/dd', viewValue: 'YYYY/MM/DD' },
];

export const CURRENCY_FORMATS: CurrencyFormatInterface[] = [
  { value: 'EUR', viewValue: 'EUR' },
  { value: 'USD', viewValue: 'USD' },
  { value: 'RUB', viewValue: 'RUB' },
  { value: 'PLN', viewValue: 'PLN' },
];
