import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AutocompleteResponseInterface } from '../models/autocomplete-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {
  constructor(private http: HttpClient) {}

  getOptions(query: string): Observable<AutocompleteResponseInterface[]> {
    return this.http.get<AutocompleteResponseInterface[]>(environment.autocompleteApi + query).pipe(
      catchError(() => {
        return of([]);
      }),
    );
  }

  getAirportByCode(code: string): Observable<AutocompleteResponseInterface | null> {
    return this.http
      .get<AutocompleteResponseInterface[]>(environment.autoCompleteSearchApi + code)
      .pipe(
        map((airports: AutocompleteResponseInterface[]) => {
          if (airports.length === 0) return null;
          return airports[0];
        }),
        catchError(() => of(null)),
      );
  }
}
