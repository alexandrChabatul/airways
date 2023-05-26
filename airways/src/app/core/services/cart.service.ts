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

  removeFromCart(items: CartItemWithFlagInterface[]): Observable<CartItemWithFlagInterface[]> {
    const cartItems: CartItemWithFlagInterface[] = this.storageService.get('cart');
    let newItems: CartItemWithFlagInterface[] = [];
    if (!cartItems) return of([]);
    newItems = cartItems.filter((storageItem) => {
      const result = items.find((item) => {
        return (
          JSON.stringify(storageItem.order) !== JSON.stringify(item.order) &&
          JSON.stringify(storageItem.passengers) !== JSON.stringify(item.passengers)
        );
      });
      return !result;
    });
    this.storageService.set('cart', newItems);
    return of(newItems);
  }

  updateCart(): Observable<CartItemWithFlagInterface[]> {
    return of(this.storageService.get('cart') || []);
  }

  mapToItemWithFlag(item: CartItemInterface): CartItemWithFlagInterface {
    return Object.assign({ isActive: true }, item);
  }
}
