import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CartItemWithFlagInterface } from '../../models/cart.models';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { removeFromCartFailureAction, removeFromCartSuccessAction } from '../actions/cart.actions';
import {
  addToHistoryAction,
  addToHistoryFailureAction,
  addToHistorySuccessAction,
  updateHistoryAction,
  updateHistoryFailureAction,
  updateHistorySuccessAction,
} from '../actions/user.actions';

@Injectable()
export class UserEffects {
  addToHistory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addToHistoryAction),
      switchMap(({ item }) => {
        return this.userService.addToHistory(item).pipe(
          map((historyItems: CartItemWithFlagInterface[]) => {
            return addToHistorySuccessAction({ items: historyItems });
          }),
          catchError(() => {
            return of(addToHistoryFailureAction());
          }),
        );
      }),
    );
  });

  removeFromCartAfterAddToHistory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addToHistoryAction),
      switchMap(({ item }) => {
        return this.cartService.removeFromCart(item, item.index).pipe(
          map((items: CartItemWithFlagInterface[]) => {
            return removeFromCartSuccessAction({ items });
          }),
          catchError(() => {
            return of(removeFromCartFailureAction());
          }),
        );
      }),
    );
  });

  updateHistory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateHistoryAction),
      switchMap(() => {
        return this.userService.updateHistory().pipe(
          map((items: CartItemWithFlagInterface[]) => {
            return updateHistorySuccessAction({ items });
          }),
          catchError(() => {
            return of(updateHistoryFailureAction());
          }),
        );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private cartService: CartService,
  ) {}
}
