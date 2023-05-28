import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { ExchangeApiResponseInterface } from '../models/exchange.models';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  constructor(private http: HttpClient) {}

  getExchangeRate(currency: string): Observable<number> {
    const url = `${environment.exchangeProxy}/api/?get=rates&key=${environment.exchangeKey}&pairs=EUR${currency}`;
    return this.http.get<ExchangeApiResponseInterface>(url).pipe(
      map((response: ExchangeApiResponseInterface) => {
        if (Array.isArray(response)) return 1;
        const rate = Number(response.data[`EUR${currency}`]);
        return isNaN(rate) ? 1 : rate;
      }),
    );
  }
}
