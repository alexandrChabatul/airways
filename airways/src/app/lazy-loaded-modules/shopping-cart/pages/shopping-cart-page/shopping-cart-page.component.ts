import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  CartItemWithFlagAndIndexInterface,
  CartItemWithFlagInterface,
} from 'src/app/core/models/cart.models';
import { toggleCartItemsActiveAction } from 'src/app/core/store/actions/cart.actions';
import { addToHistoryAction } from 'src/app/core/store/actions/user.actions';
import {
  selectActiveCount,
  selectCartActiveItems,
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

  itemsSubscription!: Subscription;

  activeItems: CartItemWithFlagAndIndexInterface[] = [];

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.items$ = this.store.select(selectCartItems);
    this.totalPrice$ = this.store.select(selectTotalCartPrice);
    this.totalActive$ = this.store.select(selectActiveCount);
    this.checkedSubscription = this.store
      .select(selectIsAllItemsActive)
      .subscribe((isAllActive) => (this.isAllChecked = isAllActive));
    this.itemsSubscription = this.store.select(selectCartActiveItems).subscribe((items) => {
      this.activeItems = items;
    });
  }

  ngOnDestroy(): void {
    this.checkedSubscription.unsubscribe();
    this.itemsSubscription.unsubscribe();
  }

  onCheckboxChange() {
    this.store.dispatch(toggleCartItemsActiveAction({ isActive: this.isAllChecked }));
  }

  onAddTrip() {
    this.router.navigateByUrl('/');
  }

  onPayment() {
    this.activeItems.forEach((item) => {
      this.store.dispatch(addToHistoryAction({ item }));
    });
  }
}
