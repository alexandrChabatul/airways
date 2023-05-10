import { Injectable } from '@angular/core';
import { CartItemInterface } from '../models/cart.models';
import { StorageService } from './storage.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private storageService: StorageService) {}

  addToCart(item: CartItemInterface): Observable<CartItemInterface[]> {
    const cartItems = this.storageService.get('cart');
    let items: CartItemInterface[] = [];
    if (cartItems) {
      items = [...cartItems, item];
    } else {
      items = [item];
    }
    this.storageService.set('cart', items);
    return of(items);
  }

  removeFromCart(items: CartItemInterface[]): Observable<CartItemInterface[]> {
    const cartItems: CartItemInterface[] = this.storageService.get('cart');
    let newItems: CartItemInterface[] = [];
    if (!cartItems) return of(items);
    newItems = cartItems.filter((storageItem) => {
      const result = items.find((item) => JSON.stringify(storageItem) !== JSON.stringify(item));
      return !result;
    });
    this.storageService.set('cart', newItems);
    return of(newItems);
  }

  updateCart(): Observable<CartItemInterface[]> {
    return of(this.storageService.get('cart') || []);
  }
}
