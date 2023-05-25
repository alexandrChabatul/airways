import { Component, OnInit } from '@angular/core';
import { SvgIconService } from '../../../../core/services/svg-icon.service';
import { Observable } from 'rxjs';
import { CurrencyFormatType } from '../../../../core/models/formats.models';
import { Store } from '@ngrx/store';
import { selectCurrencyFormat } from '../../../../core/store/selectors/formats.selectors';
import {
  selectBookingIsRound,
  selectBookingPassengersInfo,
  selectBookingTicketsPrice,
} from '../../../../core/store/selectors/booking.selectors';
import { Router } from '@angular/router';
import { BookingStateInterface } from '../../../../core/store/store.models';
import { PassengerTypeInfoInterface } from '../../../../core/models/booking.model';

@Component({
  selector: 'airways-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent implements OnInit {
  public currency$!: Observable<CurrencyFormatType>;

  public isRound$!: Observable<boolean>;

  public ticketsPrice$!: Observable<number>;

  public price = 0;

  public totalPrice = 0;

  public passengers$!: Observable<BookingStateInterface['passengers']>;

  constructor(private iconsService: SvgIconService, private store: Store, private router: Router) {
    this.iconsService.addSvgIcon('summary');
  }

  ngOnInit(): void {
    this.currency$ = this.store.select(selectCurrencyFormat);
    this.isRound$ = this.store.select(selectBookingIsRound);
    this.passengers$ = this.store.select(selectBookingPassengersInfo);
    this.ticketsPrice$ = this.store.select(selectBookingTicketsPrice);
    this.ticketsPrice$.subscribe((val) => {
      this.price = val;
    });
  }

  public navigateBack(): () => void {
    const backFn = () => {
      const urlTree = this.router.createUrlTree(['booking', 'passengers'], {
        queryParamsHandling: 'preserve',
        preserveFragment: true,
      });
      this.router.navigateByUrl(urlTree);
    };

    return backFn.bind(this);
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
}
