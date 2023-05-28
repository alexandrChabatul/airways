import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExtendedTicketInterface } from '../../../../core/models/ticket.models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectActiveTicket,
  selectActiveTicketBack,
} from '../../../../core/store/selectors/tickets.selectors';
import { deleteTicket, updateTicket } from '../../../../core/store/actions/booking.actions';
import { ActivatedRoute, Router } from '@angular/router';
import {
  selectBookingOrderTicketBack,
  selectBookingOrderTicketTo,
} from '../../../../core/store/selectors/booking.selectors';

@Component({
  selector: 'airways-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.scss'],
})
export class FlightInfoComponent implements OnInit {
  @Input() isBack = false;

  @Output() selectTicket = new EventEmitter<boolean>();

  public isTicketSelected!: boolean;

  public selectedItem$!: Observable<ExtendedTicketInterface | undefined>;

  private selectedItem: ExtendedTicketInterface | undefined = undefined;

  private bookedTicket: ExtendedTicketInterface | null = null;

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const selector = this.isBack ? selectActiveTicketBack : selectActiveTicket;
    const selectorBookedticket = this.isBack
      ? selectBookingOrderTicketBack
      : selectBookingOrderTicketTo;
    this.selectedItem$ = this.store.select(selector);

    this.selectedItem$.subscribe((val) => {
      this.selectedItem = val;
    });

    this.store.select(selectorBookedticket).subscribe((val) => {
      if (val) {
        this.bookedTicket = val;
      }
    });

    if (
      this.selectedItem &&
      this.bookedTicket &&
      JSON.stringify({
        ...this.selectedItem,
        seats: 0,
        index: 0,
        isActive: false,
        isOutdated: false,
      }) ===
        JSON.stringify({
          ...this.bookedTicket,
          seats: 0,
          index: 0,
          isActive: false,
          isOutdated: false,
        })
    ) {
      this.isTicketSelected = true;
    } else {
      this.isTicketSelected = false;
    }
  }

  public getDurationString(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration - hours * 60;

    return `${hours}h ${minutes}m`;
  }

  public clickSelect(item: ExtendedTicketInterface): void {
    if (!this.isTicketSelected) {
      const params = this.route.snapshot.queryParams;
      const queryParams = this.router.routerState.snapshot.url;
      const ticketInfo = {
        isRound: params['isRound'] !== 'false',
        originName: this.isBack
          ? item.destinationAutocomplete?.name || ''
          : item.originAutocomplete?.name || '',
        destinationName: this.isBack
          ? item.originAutocomplete?.name || ''
          : item.destinationAutocomplete?.name || '',
        queryParams,
        ticket: item,
      };
      this.store.dispatch(updateTicket({ ticketInfo, isBack: this.isBack }));
    } else {
      this.store.dispatch(deleteTicket({ isBack: this.isBack }));
    }

    this.isTicketSelected = !this.isTicketSelected;
    this.selectTicket.emit(this.isTicketSelected);
  }
}
