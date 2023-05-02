import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  // TODO: replace any with type
  logIn(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}sign-in`;
    return this.http.post<any>(url, { email, password });
  }

  // TODO: replace any with type
  signUp(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}sign-up`;
    return this.http.post<any>(url, { email, password });
  }
}
