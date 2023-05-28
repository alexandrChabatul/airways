import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import moment from 'moment';
import { CartItemWithFlagInterface } from 'src/app/core/models/cart.models';
import {
  removeFromCartAction,
  updateCartItemByIndexAction,
} from 'src/app/core/store/actions/cart.actions';
import { PassengersInterface } from 'src/app/modules/shared/models/passenger-types.models';
import { insertBookingInfo } from '../../../../core/store/actions/booking.actions';
import { BookingStateInterface } from '../../../../core/store/store.models';
import { Router } from '@angular/router';

@Component({
  selector: 'airways-cart-row',
  templateUrl: './cart-row.component.html',
})
export class CartRowComponent implements OnInit {
  @Input() item!: CartItemWithFlagInterface;

  @Input() index!: number;

  @Input() isUserPage!: boolean;

  passengers: PassengersInterface = {
    adults: 1,
    child: 0,
    infant: 0,
  };

  isActive = true;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.passengers = {
      adults: this.item.passengers.adult ? Object.keys(this.item.passengers.adult).length : 0,
      child: this.item.passengers.child ? Object.keys(this.item.passengers.child).length : 0,
      infant: this.item.passengers.infant ? Object.keys(this.item.passengers.infant).length : 0,
    };
    this.isActive = this.item.isActive;
  }

  public getTime(timeStr: string | undefined, isArrival: boolean): string {
    const time = moment.utc(timeStr);

    let newTime;

    if (isArrival) {
      newTime = time.clone().add(this.item.order.ticket?.duration, 'minute');
    } else {
      newTime = time.clone().add(this.item.order.ticketBack?.duration, 'minute');
    }

    return newTime.toString();
  }

  onCheckboxChange() {
    const newItem = { ...this.item };
    this.store.dispatch(
      updateCartItemByIndexAction({
        item: {
          ...newItem,
          isActive: this.isActive,
        },
        index: this.index,
      }),
    );
  }

  deleteItem() {
    this.store.dispatch(
      removeFromCartAction({
        item: this.item,
        index: this.index,
      }),
    );
  }

  editItem() {
    const bookingItem: BookingStateInterface = {
      order: { ...this.item.order },
      passengers: { ...this.item.passengers },
      editItemIndex: this.index,
    };
    this.store.dispatch(insertBookingInfo({ info: bookingItem }));
    this.router.navigateByUrl(this.item.order.queryParams);
  }

  showDetails() {
    //TODO show details logic
  }
}
