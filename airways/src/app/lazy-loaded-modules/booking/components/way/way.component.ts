import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ExtendedTicketInterface } from '../../../../core/models/ticket.models';
import {
  selectActiveTicket,
  selectActiveTicketBack,
} from '../../../../core/store/selectors/tickets.selectors';
import { OrderInterface } from '../../../../core/models/order.models';
import {
  selectDestinationAirport,
  selectOriginAirport,
} from '../../../../core/store/selectors/order.selectors';

@Component({
  selector: 'airways-way',
  templateUrl: './way.component.html',
  styleUrls: ['./way.component.scss'],
})
export class WayComponent implements OnInit {
  @Input() isBack = false;

  public selectedItem!: Observable<ExtendedTicketInterface | undefined>;

  public origin!: Observable<OrderInterface['origin']>;

  public destination!: Observable<OrderInterface['destination']>;

  public itemSelected = false;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.selectedItem = this.store.select(
      this.isBack ? selectActiveTicketBack : selectActiveTicket,
    );
    this.origin = this.store.select(selectOriginAirport);
    this.destination = this.store.select(selectDestinationAirport);
  }

  public changeDisplay(): void {
    this.itemSelected = !this.itemSelected;
  }
}
