import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartItemWithFlagInterface } from '../models/cart.models';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private storageService: StorageService) {}

  addToHistory(item: CartItemWithFlagInterface): Observable<CartItemWithFlagInterface[]> {
    const cartItems = this.storageService.get('history');
    let newItems: CartItemWithFlagInterface[] = [];
    if (cartItems) {
      newItems = [...cartItems, item];
    } else {
      newItems = [item];
    }
    this.storageService.set('history', newItems);
    return of(newItems);
  }

  updateHistory(): Observable<CartItemWithFlagInterface[]> {
    return of(this.storageService.get('history') || []);
  }
}
