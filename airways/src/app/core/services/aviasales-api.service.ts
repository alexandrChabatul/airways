import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AirportResponseInterface } from '../models/airport-response.interface';

// 'https://proxy-aviasales.onrender.com/api/aviasales/v3/prices_for_dates?origin=MOW&destination=DXB&currency=usd&departure_at=2023-05-10&return_at=2023-05-12&sorting=price&direct=true&limit=10&token=818742e1992a37574a3e690b0f58ef00',

@Injectable({
  providedIn: 'root',
})
export class AviasalesApiService {
  constructor(private http: HttpClient) {}

  getTicketsMapDyDate(origin: string, destination: string, departure: Moment) {
    console.log(departure.format('YYYY-MM'));
    const url = `${environment.aviasalesProxy}/aviasales/v3/grouped_prices`;
    this.http
      .get(url, {
        params: {
          origin,
          destination,
          departure_at: departure.format('YYYY-MM'),
        },
      })
      .pipe(tap(console.log))
      .subscribe((data) => console.log(data));
  }

  getOptions(query: string): Observable<AirportResponseInterface[]> {
    return this.http.get<AirportResponseInterface[]>(environment.autocompleteApi + query).pipe(
      catchError(() => {
        return of([]);
      }),
    );
  }

  getAirportByCode(code: string): Observable<AirportResponseInterface | null> {
    if (!code) return of(null);
    return this.http.get<AirportResponseInterface[]>(environment.autoCompleteSearchApi + code).pipe(
      map((airports: AirportResponseInterface[]) => {
        if (airports.length === 0) return null;
        return airports[0];
      }),
      catchError(() => of(null)),
    );
  }
}
