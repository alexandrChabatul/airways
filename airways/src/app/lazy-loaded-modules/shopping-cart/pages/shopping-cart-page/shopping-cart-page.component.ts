import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CartItemWithFlagInterface } from 'src/app/core/models/cart.models';
import { toggleCartItemsActiveAction } from 'src/app/core/store/actions/cart.actions';
import {
  selectActiveCount,
  selectCartItems,
  selectIsAllItemsActive,
  selectTotalCartPrice,
} from 'src/app/core/store/selectors/cart.selectors';

@Component({
  selector: 'airways-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
})
export class ShoppingCartPageComponent implements OnInit, OnDestroy {
  items$!: Observable<CartItemWithFlagInterface[] | null>;

  totalPrice$!: Observable<number>;

  totalActive$!: Observable<number>;

  isAllChecked = true;

  checkedSubscription!: Subscription;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.items$ = this.store.select(selectCartItems);
    this.totalPrice$ = this.store.select(selectTotalCartPrice);
    this.totalActive$ = this.store.select(selectActiveCount);
    this.checkedSubscription = this.store
      .select(selectIsAllItemsActive)
      .subscribe((isAllActive) => (this.isAllChecked = isAllActive));
  }

  ngOnDestroy(): void {
    this.checkedSubscription.unsubscribe();
  }

  onCheckboxChange() {
    this.store.dispatch(toggleCartItemsActiveAction({ isActive: this.isAllChecked }));
  }

  onAddTrip() {
    this.router.navigateByUrl('/');
  }

  onPayment() {
    //TODO payment
  }
}
