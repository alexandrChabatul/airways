import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CartItemWithFlagInterface } from '../../models/cart.models';
import { CartService } from '../../services/cart.service';
import {
  addToCartAction,
  addToCartFailureAction,
  addToCartSuccessAction,
  removeFromCartAction,
  removeFromCartFailureAction,
  removeFromCartSuccessAction,
  updateCartAction,
  updateCartFailureAction,
  updateCartSuccessAction,
} from '../actions/cart.actions';

@Injectable()
export class CartEffects {
  addToCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addToCartAction),
      switchMap(({ item }) => {
        return this.cartService.addToCart(item).pipe(
          map((items: CartItemWithFlagInterface[]) => {
            return addToCartSuccessAction({ items });
          }),
          catchError(() => {
            return of(addToCartFailureAction());
          }),
        );
      }),
    );
  });

  removeFromCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeFromCartAction),
      switchMap(({ item, index }) => {
        return this.cartService.removeFromCart(item, index).pipe(
          map((cartItems: CartItemWithFlagInterface[]) => {
            return removeFromCartSuccessAction({ items: cartItems });
          }),
          catchError(() => {
            return of(removeFromCartFailureAction());
          }),
        );
      }),
    );
  });

  updateCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateCartAction),
      switchMap(() => {
        return this.cartService.updateCart().pipe(
          map((items: CartItemWithFlagInterface[]) => {
            return updateCartSuccessAction({ items });
          }),
          catchError(() => {
            return of(updateCartFailureAction());
          }),
        );
      }),
    );
  });

  constructor(private actions$: Actions, private cartService: CartService) {}
}
