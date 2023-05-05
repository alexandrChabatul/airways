import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../models/action-types/auth.action-types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  logIn(email: string, password: string): Observable<AuthResponseData> {
    const url = `${environment.base_url}signin`;
    return this.http.post<AuthResponseData>(url, { email, password });
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    const url = `${environment.base_url}signup`;
    return this.http.post<AuthResponseData>(url, { email, password });
  }
}
