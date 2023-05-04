export interface ResponsiveOptionInterface {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}

export interface CalendarInterface {
  date: string;
  day: string;
  price: number;
  isActive: boolean;
}

export interface DaysWithIndexesInterface extends CalendarInterface {
  index: number;
}
