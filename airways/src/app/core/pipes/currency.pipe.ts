import { Pipe, PipeTransform } from '@angular/core';
import { selectCurrencyFormat, selectExchangeRate } from '../store/selectors/formats.selectors';
import { Store } from '@ngrx/store';
import { Observable, map, mergeMap } from 'rxjs';

@Pipe({
  name: 'currency',
})
export class CurrencyPipe implements PipeTransform {
  constructor(private store: Store) {}

  currencyFormat$ = this.store.select(selectCurrencyFormat);

  exchangeRate$ = this.store.select(selectExchangeRate);

  formatterUSD = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  });

  formatterEUR = new Intl.NumberFormat('de', {
    style: 'currency',
    currency: 'EUR',
  });

  formatterRUB = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency: 'RUB',
  });

  transform(value: number): Observable<string> {
    return this.exchangeRate$.pipe(
      map((rate) => value * rate),
      mergeMap((price) =>
        this.currencyFormat$.pipe(
          map((format) => {
            switch (format) {
              case 'USD':
                return this.formatterUSD.format(price);
              case 'RUB':
                return this.formatterRUB.format(price);
              default:
                return this.formatterEUR.format(price);
            }
          }),
        ),
      ),
    );
  }
}
