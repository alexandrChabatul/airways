import { Injectable } from '@angular/core';
import { CartItemInterface, CartItemWithFlagInterface } from '../models/cart.models';
import { StorageService } from './storage.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private storageService: StorageService) {}

  addToCart(item: CartItemInterface): Observable<CartItemWithFlagInterface[]> {
    const cartItems = this.storageService.get('cart');
    let items: CartItemWithFlagInterface[] = [];
    if (cartItems) {
      items = [...cartItems, this.mapToItemWithFlag(item)];
    } else {
      items = [this.mapToItemWithFlag(item)];
    }
    this.storageService.set('cart', items);
    return of(items);
  }

  removeFromCart(
    item: CartItemWithFlagInterface,
    index: number,
  ): Observable<CartItemWithFlagInterface[]> {
    const cartItems: CartItemWithFlagInterface[] = this.storageService.get('cart');
    if (cartItems && cartItems[index]) {
      cartItems.splice(index, 1);
    }
    this.storageService.set('cart', cartItems);
    return of(cartItems);
  }

  updateCart(): Observable<CartItemWithFlagInterface[]> {
    return of(this.storageService.get('cart') || []);
  }

  mapToItemWithFlag(item: CartItemInterface): CartItemWithFlagInterface {
    return Object.assign({ isActive: true }, item);
  }
}
