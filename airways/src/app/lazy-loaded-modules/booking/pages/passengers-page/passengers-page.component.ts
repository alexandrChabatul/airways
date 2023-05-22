import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PassengersInterface } from '../../../../modules/shared/models/passenger-types.models';
import { Store } from '@ngrx/store';
import { selectPassengers } from '../../../../core/store/selectors/order.selectors';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { updatePassengersInfo } from '../../../../core/store/actions/booking.actions';
import { BookingStateInterface } from '../../../../core/store/store.models';

@Component({
  selector: 'airways-passengers-page',
  templateUrl: './passengers-page.component.html',
})
export class PassengersPageComponent implements OnInit {
  public passengers!: Observable<PassengersInterface>;

  public passengerPageForm = new FormGroup({
    adult: new FormGroup({}),
    child: new FormGroup({}),
    infant: new FormGroup({}),
  });

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.passengers = this.store.select(selectPassengers);
  }

  public getArrayFromNumber(number: number): string[] {
    return Array(number).fill('');
  }

  public navigateBack(): () => void {
    const backFn = () => {
      const urlTree = this.router.createUrlTree(['booking'], {
        queryParamsHandling: 'preserve',
        preserveFragment: true,
      });
      this.router.navigateByUrl(urlTree);
    };

    return backFn.bind(this);
  }

  public navigateContinue(): () => void {
    const continueFn = () => {
      const urlTree = this.router.createUrlTree(['booking', 'summary'], {
        queryParamsHandling: 'preserve',
        preserveFragment: true,
      });

      if (this.passengerPageForm.valid) {
        const info = this.passengerPageForm.value as BookingStateInterface['passengers'];
        this.store.dispatch(updatePassengersInfo({ info }));
        this.router.navigateByUrl(urlTree);
      } else {
        this.passengerPageForm.markAllAsTouched();
      }
    };

    return continueFn.bind(this);
  }
}
