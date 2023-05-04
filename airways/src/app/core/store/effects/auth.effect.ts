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

@Injectable()
export class AuthEffect {
  loginRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginRequestAction),
      exhaustMap((action) => {
        return this.authService.logIn(action.credentials.email, action.credentials.password).pipe(
          map((loginSuccessResponse) => loginSuccessAction({ loginSuccessResponse })),
          catchError((error) => of(loginFailureAction({ error }))),
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

  signupRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupRequestAction),
      exhaustMap((action) => {
        return this.authService.signUp(action.credentials.email, action.credentials.password).pipe(
          map((signupSuccessResponse) => signupSuccessAction({ signupSuccessResponse })),
          catchError((error) => of(signupFailureAction({ error }))),
        );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}
}
