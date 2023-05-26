import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ExtendedTicketInterface } from '../../../../core/models/ticket.models';
import {
  selectBookingOrderTicketBack,
  selectBookingOrderTicketTo,
} from '../../../../core/store/selectors/booking.selectors';
import moment from 'moment';
import { BookingStateInterface } from 'src/app/core/store/store.models';

@Component({
  selector: 'airways-flight-summary',
  templateUrl: './flight-summary.component.html',
  styleUrls: ['./flight-summary.component.scss'],
})
export class FlightSummaryComponent implements OnInit {
  @Input() isBack = false;

  public ticket$!: Observable<ExtendedTicketInterface | null | undefined>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    const selector = this.isBack ? selectBookingOrderTicketBack : selectBookingOrderTicketTo;
    this.ticket$ = this.store.select(selector);
  }

  public getArrivalTime(ticket: ExtendedTicketInterface): string {
    const departure = moment(ticket.departure_at);
    const arrival = departure.clone().add(ticket.duration, 'minutes');
    return arrival.toString();
  }
}
