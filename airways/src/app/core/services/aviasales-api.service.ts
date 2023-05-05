import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TicketsResponseInterface } from '../models/tickets-response.model';
import { TicketInterface } from '../models/ticket.models';

// 'https://proxy-aviasales.onrender.com/api/aviasales/v3/prices_for_dates?origin=MOW&destination=DXB&currency=usd&departure_at=2023-05-10&return_at=2023-05-12&sorting=price&direct=true&limit=10&token=818742e1992a37574a3e690b0f58ef00',

@Injectable({
  providedIn: 'root',
})
export class AviasalesApiService {
  private link = '/aviasales/v3/grouped_prices';

  constructor(private http: HttpClient) {}

  public getTicketsMapDyDate(
    origin: string,
    destination: string,
    departure: Moment,
    currency: string,
  ): Observable<TicketInterface[]> {
    const url = `${environment.aviasalesProxy}${this.link}`;
    return this.http
      .get<TicketsResponseInterface>(url, {
        params: {
          origin,
          destination,
          departure_at: departure.format('YYYY-MM'),
          currency,
        },
      })
      .pipe(
        map((response: TicketsResponseInterface) => {
          if (!response.success) {
            return [];
          }

          const arr = [];
          for (const key in response.data) {
            arr.push(response.data[key]);
          }

          return arr;
        }),
        catchError(() => {
          return of([]);
        }),
      );
  }
}
