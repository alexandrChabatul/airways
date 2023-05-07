import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import {
  loginRequestAction,
  loginFailureAction,
  loginSuccessAction,
  signupRequestAction,
  signupSuccessAction,
  signupFailureAction,
} from '../actions/auth.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthEffects {
  loginRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginRequestAction),
      exhaustMap((action) => {
        return this.authService.logIn(action.credentials.email, action.credentials.password).pipe(
          map((loginSuccessResponse) => loginSuccessAction({ loginSuccessResponse })),
          catchError((errorResponse: HttpErrorResponse) => {
            const errorMessage = errorResponse.error;
            return of(loginFailureAction({ loginFailureResponse: errorMessage }));
          }),
        );
      }),
    );
  });

  signupRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupRequestAction),
      exhaustMap((action) => {
        return this.authService.signUp(action.credentials.email, action.credentials.password).pipe(
          map((signupSuccessResponse) => signupSuccessAction({ signupSuccessResponse })),
          catchError((errorResponse: HttpErrorResponse) => {
            const errorMessage = errorResponse.error;
            return of(signupFailureAction({ signupFailureResponse: errorMessage }));
          }),
        );
      }),
    );
  });

  successRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccessAction, signupSuccessAction]),
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
