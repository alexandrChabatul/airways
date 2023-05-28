import { Component, OnInit } from '@angular/core';
import { SvgIconService } from '../../../core/services/svg-icon.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItemWithFlagInterface } from '../../../core/models/cart.models';
import { Store } from '@ngrx/store';
import {
  selectDetailsOrder,
  selectDetailsTicketsPrice,
} from '../../../core/store/selectors/user-details.selectors';
import { selectDetailsPassengers } from '../../../core/store/selectors/user-details.selectors';
import { PassengerTypeInfoInterface } from '../../../core/models/booking.model';
import { BookingStateInterface } from '../../../core/store/store.models';
import { removeDetails } from '../../../core/store/actions/user-details.actions';

@Component({
  selector: 'airways-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public order$!: Observable<CartItemWithFlagInterface['order'] | null>;

  public passengers$!: Observable<CartItemWithFlagInterface['passengers'] | null>;

  public totalPrice = 0;

  public price = 0;

  constructor(private iconsService: SvgIconService, private router: Router, private store: Store) {
    this.iconsService.addSvgIcon('summary');
  }

  ngOnInit(): void {
    this.order$ = this.store.select(selectDetailsOrder);
    this.passengers$ = this.store.select(selectDetailsPassengers);
    this.store.select(selectDetailsTicketsPrice).subscribe((val) => {
      this.price = val;
    });
  }

  public getObjectLength(obj: PassengerTypeInfoInterface | null): number {
    if (obj) {
      return Object.keys(obj).length;
    }

    return 0;
  }

  private getPriceByType(
    price: number,
    amount: number,
    type: 'adult' | 'child' | 'infant',
  ): number {
    const childDiscountedPrice = 0.8;
    const infantDiscountedPrice = 0.1;
    let totalPrice = price * amount;

    if (type === 'child') {
      totalPrice = totalPrice * childDiscountedPrice;
    }

    if (type === 'infant') {
      totalPrice = totalPrice * infantDiscountedPrice;
    }

    return totalPrice;
  }

  public getTotalPrice(
    passengers: BookingStateInterface['passengers'],
    price: number,
  ): {
    adult: number;
    child: number;
    infant: number;
    total: number;
  } {
    const adultPrice = passengers.adult
      ? this.getPriceByType(price, this.getObjectLength(passengers.adult), 'adult')
      : 0;

    const childPrice = passengers.child
      ? this.getPriceByType(price, this.getObjectLength(passengers.child), 'child')
      : 0;

    const infantPrice = passengers.infant
      ? this.getPriceByType(price, this.getObjectLength(passengers.infant), 'infant')
      : 0;

    this.totalPrice = adultPrice + childPrice + infantPrice;

    return {
      adult: adultPrice,
      child: childPrice,
      infant: infantPrice,
      total: this.totalPrice,
    };
  }

  public navigateToUserPage(): void {
    this.store.dispatch(removeDetails());
    this.router.navigate(['user-page']);
  }
}
