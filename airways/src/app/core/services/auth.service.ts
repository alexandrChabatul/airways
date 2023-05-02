import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../store/action-types/auth.action-types';

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

  logIn(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}sign-in`;
    return this.http.post<User>(url, { email, password });
  }

  signUp(email: string, password: string): Observable<User> {
    const url = `${this.BASE_URL}sign-up`;
    return this.http.post<User>(url, { email, password });
  }
}
