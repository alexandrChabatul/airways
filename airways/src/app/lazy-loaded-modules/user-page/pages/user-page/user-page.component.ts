import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItemWithFlagInterface } from 'src/app/core/models/cart.models';
import { selectHistoryItems } from 'src/app/core/store/selectors/user.selectors';

@Component({
  selector: 'airways-user-page',
  templateUrl: './user-page.component.html',
})
export class UserPageComponent implements OnInit {
  items$!: Observable<CartItemWithFlagInterface[] | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.items$ = this.store.select(selectHistoryItems);
  }
}
