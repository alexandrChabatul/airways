import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthLoginResponse, AuthSignupResponse } from '../store/action-types/auth.action-types';

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

  logIn(email: string, password: string): Observable<AuthLoginResponse> {
    const url = `${this.BASE_URL}signin`;
    return this.http.post<AuthLoginResponse>(url, { email, password });
  }

  signUp(email: string, password: string): Observable<AuthSignupResponse> {
    const url = `${this.BASE_URL}signup`;
    return this.http.post<AuthSignupResponse>(url, { email, password });
  }
}
