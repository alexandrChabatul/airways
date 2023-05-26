import { Component, Input, OnInit } from '@angular/core';
import moment from 'moment';
import { CartItemWithFlagInterface } from 'src/app/core/models/cart.models';
import { PassengersInterface } from 'src/app/modules/shared/models/passenger-types.models';

@Component({
  selector: 'airways-cart-row',
  templateUrl: './cart-row.component.html',
})
export class CartRowComponent implements OnInit {
  @Input() item!: CartItemWithFlagInterface;

  passengers: PassengersInterface = {
    adults: 1,
    child: 0,
    infant: 0,
  };

  ngOnInit(): void {
    this.passengers = {
      adults: this.item.passengers.adult ? Object.keys(this.item.passengers.adult).length : 0,
      child: this.item.passengers.child ? Object.keys(this.item.passengers.child).length : 0,
      infant: this.item.passengers.infant ? Object.keys(this.item.passengers.infant).length : 0,
    };
  }

  checked = false;

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
}
