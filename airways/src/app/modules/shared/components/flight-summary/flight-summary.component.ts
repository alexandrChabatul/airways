import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ExtendedTicketInterface } from '../../../../core/models/ticket.models';
import {
  selectBookingOrderTicketBack,
  selectBookingOrderTicketTo,
  selectBookingPassengerArray,
} from '../../../../core/store/selectors/booking.selectors';
import moment from 'moment';
import { PassengerArrayInterface } from '../../../../core/models/booking.model';
import { selectDetailsPassengerArray } from '../../../../core/store/selectors/user-details.selectors';

@Component({
  selector: 'airways-flight-summary',
  templateUrl: './flight-summary.component.html',
  styleUrls: ['./flight-summary.component.scss'],
})
export class FlightSummaryComponent implements OnInit {
  @Input() isBack = false;

  @Input() ticketDetails: ExtendedTicketInterface | null | undefined = null;

  @Input() isForDetails = false;

  public ticket$!: Observable<ExtendedTicketInterface | null | undefined>;

  public passengerArray$!: Observable<PassengerArrayInterface[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    if (!this.isForDetails) {
      const selector = this.isBack ? selectBookingOrderTicketBack : selectBookingOrderTicketTo;
      this.ticket$ = this.store.select(selector);
    }

    this.passengerArray$ = this.isForDetails
      ? this.store.select(selectDetailsPassengerArray)
      : this.store.select(selectBookingPassengerArray);
  }

  public getArrivalTime(ticket: ExtendedTicketInterface): string {
    const departure = moment(ticket.departure_at);
    const arrival = departure.clone().add(ticket.duration, 'minutes');
    return arrival.toString();
  }
}
