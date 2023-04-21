import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { loginAction, loginFailureAction, loginSuccessAction } from '../actions/auth.actions';

@Injectable()
export class LoginEffect {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ login, password }) => {
        return this.authService.login(login, password).pipe(
          map((response: string) => {
            return loginSuccessAction({ username: response });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.warn(errorResponse);
            return of(loginFailureAction());
          }),
        );
      }),
    );
  });

  redirectAfterSubmit$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/');
        }),
      );
    },
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}
}
