import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
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
}
