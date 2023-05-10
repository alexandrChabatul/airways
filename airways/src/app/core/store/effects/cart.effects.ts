import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CartItemInterface } from '../../models/cart.models';
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
export class CartEffect {
  addToCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addToCartAction),
      switchMap(({ item }) => {
        return this.cartService.addToCart(item).pipe(
          map((items: CartItemInterface[]) => {
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
      switchMap(({ items }) => {
        return this.cartService.removeFromCart(items).pipe(
          map((items: CartItemInterface[]) => {
            return removeFromCartSuccessAction({ items });
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
          map((items: CartItemInterface[]) => {
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
