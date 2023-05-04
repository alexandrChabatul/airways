import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../store/action-types/auth.action-types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // TODO: move url to environment
  private BASE_URL = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<AuthResponseData> {
    const url = `${this.BASE_URL}signin`;
    return this.http.post<AuthResponseData>(url, { email, password });
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    const url = `${this.BASE_URL}signup`;
    return this.http.post<AuthResponseData>(url, { email, password });
  }
}
