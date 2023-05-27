import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { changeCurrencyFormat, changeExchangeRate } from '../actions/formats.actions';
import { ExchangeRateService } from '../../services/exchange-rate.service';

@Injectable()
export class ExchangeRateEffect {
  exchangeRate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(changeCurrencyFormat),
      switchMap(({ currencyFormat }) => {
        return this.exchangeRateService.getExchangeRate(currencyFormat).pipe(
          map((exchangeRate: number) => {
            return changeExchangeRate({ exchangeRate });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.warn(errorResponse);
            return of(changeExchangeRate({ exchangeRate: 1 }));
          }),
        );
      }),
    );
  });

  constructor(private actions$: Actions, private exchangeRateService: ExchangeRateService) {}
}
