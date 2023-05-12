import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { updateOrderAction } from '../../store/actions/order.actions';
import { OrderInterface } from '../../models/order.models';
import {
  selectOriginAirport,
  selectDestinationAirport,
  selectArrivalDate,
  selectDepartureDate,
  selectPassengers,
  selectIsRoundTrip,
} from '../../store/selectors/order.selectors';

@Component({
  selector: 'airways-edit-flight',
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.scss'],
})
export class EditFlightComponent implements OnInit {
  public isRoundTrip$!: Observable<boolean>;

  public origin$!: Observable<OrderInterface['origin']>;

  public destination$!: Observable<OrderInterface['destination']>;

  public arrival$!: Observable<OrderInterface['arrival']>;

  public departure$!: Observable<OrderInterface['departure']>;

  public passengers$!: Observable<OrderInterface['passengers']>;

  constructor(private store: Store, private activateRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(updateOrderAction({ params: this.activateRoute.snapshot.queryParams }));
    this.origin$ = this.store.select(selectOriginAirport);
    this.destination$ = this.store.select(selectDestinationAirport);
    this.arrival$ = this.store.select(selectArrivalDate);
    this.departure$ = this.store.select(selectDepartureDate);
    this.passengers$ = this.store.select(selectPassengers);
    this.isRoundTrip$ = this.store.select(selectIsRoundTrip);
  }
}
