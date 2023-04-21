import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClientModule) {}

  login(login: string, password: string) {
    return of('response from server' + login + password);
  }
}
