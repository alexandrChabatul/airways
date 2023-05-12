import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AviasalesApiInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.startsWith(environment.aviasalesProxy)) return next.handle(request);

    const requestWithToken = request.clone({
      params: request.params.append('token', environment.aviasalesKey),
    });

    return next.handle(requestWithToken);
  }
}
