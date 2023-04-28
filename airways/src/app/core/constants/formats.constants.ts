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

export const DEFAULT_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
