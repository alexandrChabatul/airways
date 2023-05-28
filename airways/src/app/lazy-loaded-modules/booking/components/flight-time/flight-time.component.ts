import { Component, Input, OnInit } from '@angular/core';
import { ExtendedTicketInterface } from '../../../../core/models/ticket.models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import moment from 'moment';
import {
  selectActiveTicket,
  selectActiveTicketBack,
} from '../../../../core/store/selectors/tickets.selectors';

@Component({
  selector: 'airways-flight-time',
  templateUrl: './flight-time.component.html',
  styleUrls: ['./flight-time.component.scss'],
})
export class FlightTimeComponent implements OnInit {
  @Input() isArrival = false;

  @Input() isBack = false;

  selectedItem$!: Observable<ExtendedTicketInterface | undefined>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    const selector = this.isBack ? selectActiveTicketBack : selectActiveTicket;
    this.selectedItem$ = this.store.select(selector);
  }

  public getTime(item: ExtendedTicketInterface): string {
    const time = moment.utc(item.departure_at);

    if (this.isArrival) {
      const arrival = time.clone().add(item.duration, 'minute');

      return arrival.toString();
    }

    return time.toString();
  }
}
