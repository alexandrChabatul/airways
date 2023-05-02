import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription } from 'rxjs';
import {
  swapAirportsAction,
  updateOrderAction,
  updateOrderTypeAction,
} from 'src/app/core/store/actions/order.actions';
import { Event as NavigationEvent } from '@angular/router';
import {
  selectDestinationAirport,
  selectOriginAirport,
  selectTripType,
} from 'src/app/core/store/selectors/order.selectors';
import { AirportResponseInterface } from 'src/app/core/models/airport-response.interface';
import { TripType } from 'src/app/core/models/order.models';
import { UrlParamsService } from 'src/app/core/services/url-params.service';

@Component({
  selector: 'airways-home-page',
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;

  routerSubscription!: Subscription;

  type$!: Observable<TripType | null>;

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
    this.type$ = this.store.select(selectTripType);
    this.originAirport$ = this.store.select(selectOriginAirport);
    this.destinationAirport$ = this.store.select(selectDestinationAirport);
  }

  initializeForms(): void {
    this.searchForm = this.fb.group({
      tripType: [''],
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
    const origin = this.searchForm.controls['origin'].value;
    const destination = this.searchForm.controls['destination'].value;
    if (origin && destination) {
      this.store.dispatch(
        swapAirportsAction({
          origin,
          destination,
        }),
      );
    }
  }

  radioChange() {
    this.store.dispatch(
      updateOrderTypeAction({ param: 'type', data: this.searchForm.controls['tripType'].value }),
    );
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
