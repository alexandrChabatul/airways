import { Component, Input } from '@angular/core';
import moment from 'moment';
import { CartItemInterface } from 'src/app/core/models/cart.models';

@Component({
  selector: 'airways-cart-row',
  templateUrl: './cart-row.component.html',
})
export class CartRowComponent {
  @Input() item!: CartItemInterface;

  checked = false;

  public getTime(timeStr: string, isArrival: boolean): string {
    const time = moment.utc(timeStr);

    let newTime;

    if (isArrival) {
      newTime = time.clone().add(this.item.duration_to, 'minute');
    } else {
      newTime = time.clone().add(this.item.duration_from, 'minute');
    }

    return newTime.toString();
  }
}
