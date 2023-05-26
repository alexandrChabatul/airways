import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItemWithFlagInterface } from 'src/app/core/models/cart.models';
import { selectCartItems } from 'src/app/core/store/selectors/cart.selectors';

@Component({
  selector: 'airways-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
})
export class ShoppingCartPageComponent implements OnInit {
  items$!: Observable<CartItemWithFlagInterface[] | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.items$ = this.store.select(selectCartItems);
  }
}
