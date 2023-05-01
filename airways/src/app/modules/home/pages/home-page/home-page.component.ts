import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription } from 'rxjs';
import { updateOrderAction } from 'src/app/core/store/actions/order.actions';
import { selectDateFormatInUppercase } from 'src/app/core/store/selectors/formats.selectors';
import { Event as NavigationEvent } from '@angular/router';
import { PassengersInterface } from '../../models/passenger-types.models';
import {
  selectArrivalDate,
  selectDepartureDate,
  selectDestinationAirport,
  selectOriginAirport,
  selectPassengers,
} from 'src/app/core/store/selectors/order.selectors';
import { AirportResponseInterface } from 'src/app/core/models/airport-response.interface';
import { OrderInterface } from 'src/app/core/models/order.models';
import { UrlParamsService } from 'src/app/core/services/url-params.service';

@Component({
  selector: 'airways-home-page',
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit, OnDestroy {
  dateFormat$!: Observable<string>;

  searchForm!: FormGroup;

  routerSubscription!: Subscription;

  order$!: Observable<OrderInterface>;

  passengers$!: Observable<PassengersInterface>;

  arrivalDate$!: Observable<string | null>;

  departureDate$!: Observable<string | null>;

  originAirport$!: Observable<AirportResponseInterface | null>;

  destinationAirport$!: Observable<AirportResponseInterface | null>;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private urlParamsService: UrlParamsService,
  ) {}

  ngOnInit(): void {
    this.initializeForms();
    this.initializeListeners();
    this.initializeValues();
    this.store.dispatch(updateOrderAction({ params: this.activateRoute.snapshot.queryParams }));
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  initializeValues() {
    this.dateFormat$ = this.store.select(selectDateFormatInUppercase);
    this.passengers$ = this.store.select(selectPassengers);
    this.departureDate$ = this.store.select(selectDepartureDate);
    this.arrivalDate$ = this.store.select(selectArrivalDate);
    this.originAirport$ = this.store.select(selectOriginAirport);
    this.destinationAirport$ = this.store.select(selectDestinationAirport);
  }

  initializeForms(): void {
    this.searchForm = this.fb.group({
      tripType: ['round-trip', [Validators.required]],
    });
  }

  initializeListeners() {
    this.routerSubscription = this.router.events
      .pipe(filter((event: NavigationEvent) => event instanceof NavigationStart))
      .subscribe((event) => {
        if (event instanceof NavigationStart && event.restoredState) {
          const paramsString = event.url.split('?')[1];
          if (!paramsString) return;
          const searchParams = Object.fromEntries(
            paramsString.split('&').map((param) => param.split('=')),
          );
          this.store.dispatch(updateOrderAction({ params: searchParams }));
        }
      });
  }

  swapFields() {
    const from = this.searchForm.controls['origin'].value;
    const destination = this.searchForm.controls['destination'].value;
    if (from && destination) {
      this.searchForm.controls['destination'].setValue(from);
      this.searchForm.controls['origin'].setValue(destination);
    }
  }

  onSearchFormSubmit(): void {
    if (!this.searchForm.valid) {
      this.searchForm.markAllAsTouched();
      return;
    }
    const params = this.urlParamsService.getQueryParamObj(this.searchForm.value);
    const urlTree = this.router.createUrlTree(['booking'], {
      queryParams: params,
      queryParamsHandling: 'merge',
      preserveFragment: true,
    });
    this.router.navigateByUrl(urlTree);
  }
}
