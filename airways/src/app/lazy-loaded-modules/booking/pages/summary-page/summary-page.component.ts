import { Component, OnInit } from '@angular/core';
import { SvgIconService } from '../../../../core/services/svg-icon.service';
import { Observable } from 'rxjs';
import { CurrencyFormatType } from '../../../../core/models/formats.models';
import { Store } from '@ngrx/store';
import { selectCurrencyFormat } from '../../../../core/store/selectors/formats.selectors';
import {
  selectBookingFeature,
  selectBookingIsRound,
} from '../../../../core/store/selectors/booking.selectors';
import { Router } from '@angular/router';
import { BookingStateInterface } from 'src/app/core/store/store.models';
import { addToCartAction } from 'src/app/core/store/actions/cart.actions';

@Component({
  selector: 'airways-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent implements OnInit {
  public currency$!: Observable<CurrencyFormatType>;

  public isRound$!: Observable<boolean>;

  public booking!: BookingStateInterface;

  constructor(private iconsService: SvgIconService, private store: Store, private router: Router) {
    this.iconsService.addSvgIcon('summary');
  }

  ngOnInit(): void {
    this.currency$ = this.store.select(selectCurrencyFormat);
    this.isRound$ = this.store.select(selectBookingIsRound);
    this.store.select(selectBookingFeature).subscribe((store) => (this.booking = store));
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

  addToCart() {
    console.log(this.booking);
    this.store.dispatch(
      addToCartAction({ item: Object.assign({ totalPrice: 100 }, this.booking) }),
    );
  }
}
