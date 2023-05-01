import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AirportResponseInterface } from '../models/airport-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {
  constructor(private http: HttpClient) {}

  getOptions(query: string): Observable<AirportResponseInterface[]> {
    console.log('get');
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
