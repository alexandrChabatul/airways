export type DateFormatType = 'MM/dd/yyyy' | 'dd/MM/yyyy' | 'yyyy/dd/MM' | 'yyyy/MM/dd';

export type CurrencyFormatType = 'EUR' | 'USD' | 'RUB' | 'PLN';

export interface DateFormatInterface {
  value: DateFormatType;
  viewValue: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY/DD/MM' | 'YYYY/MM/DD';
}

export interface CurrencyFormatInterface {
  value: CurrencyFormatType;
  viewValue: CurrencyFormatType;
}
