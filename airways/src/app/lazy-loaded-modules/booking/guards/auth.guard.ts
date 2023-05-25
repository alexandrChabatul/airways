import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { selectIsAuthenticated } from '../../../core/store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(selectIsAuthenticated).pipe(
      tap((val) => {
        if (!val) {
          this.router.navigate([{ outlets: { auth: ['auth'] } }], {
            queryParamsHandling: 'preserve',
          });
        }
      }),
    );
  }
}
