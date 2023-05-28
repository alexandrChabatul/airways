import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  ticketsChangeActive,
  ticketsLoadAction,
} from '../../../../core/store/actions/tickets.actions';
import { Observable } from 'rxjs';
import {
  selectTicketsBackData,
  selectTicketsData,
  selectTicketsLoading,
} from '../../../../core/store/selectors/tickets.selectors';
import { selectIsRoundTrip } from '../../../../core/store/selectors/order.selectors';
import {
  selectBookingOrderLink,
  selectBookingOrderTicketBack,
  selectBookingOrderTicketTo,
  selectBookingOrderValidity,
} from '../../../../core/store/selectors/booking.selectors';
import { Location } from '@angular/common';
import { ExtendedTicketInterface } from '../../../../core/models/ticket.models';

@Component({
  selector: 'airways-flights-page',
  templateUrl: './flights-page.component.html',
  styleUrls: ['./flights-page.component.scss'],
})
export class FlightsPageComponent implements OnInit {
  public isRound$!: Observable<boolean>;

  public areTicketsLoading$!: Observable<boolean>;

  public isOrderValid$!: Observable<boolean>;

  private orderLink = '';

  private ticketTo: ExtendedTicketInterface | null = null;

  private ticketBack: ExtendedTicketInterface | null | undefined = null;

  private ticketArrayTo: ExtendedTicketInterface[] = [];

  private ticketArrayBack: ExtendedTicketInterface[] = [];

  constructor(private router: Router, private store: Store, private location: Location) {}

  public ngOnInit(): void {
    this.updateTicketValues();
    const link = this.router.routerState.snapshot.url;
    this.checkTickets(link);
    this.areTicketsLoading$ = this.store.select(selectTicketsLoading);
    this.isRound$ = this.store.select(selectIsRoundTrip);
    this.isOrderValid$ = this.store.select(selectBookingOrderValidity);
    this.location.onUrlChange((val) => {
      if (this.isFlightSearchPage(val)) {
        this.checkTickets(val);
      }
    });
  }

  public navigateBack(): () => void {
    const backFn = () => {
      const urlTree = this.router.createUrlTree([''], {
        queryParamsHandling: 'preserve',
        preserveFragment: true,
      });
      this.router.navigateByUrl(urlTree);
    };

    return backFn.bind(this);
  }

  public navigateContinue(): () => void {
    const continueFn = () => {
      const urlTree = this.router.createUrlTree(['booking', 'passengers'], {
        queryParamsHandling: 'preserve',
        preserveFragment: true,
      });
      this.router.navigateByUrl(urlTree);
    };
    return continueFn.bind(this);
  }

  private getParamsObj(link: string): Params {
    const query = link.split('?')[1];
    let params = {};

    if (query) {
      params = Object.fromEntries(query.split('&').map((val) => val.split('=')));
    }

    return params;
  }

  private isFlightSearchPage(link: string): boolean {
    const pathArray = link.split('/');
    const mainPath = pathArray[1] ? pathArray[1].split('?')[0] : pathArray[0];
    if (mainPath === 'booking' && pathArray.length <= 2) {
      return true;
    }
    return false;
  }

  private checkTickets(link: string): void {
    if (link === this.orderLink) {
      let ticketToInArray = false;
      let ticketBackInArray = false;

      if (this.ticketTo) {
        ticketToInArray = this.isTicketActive(this.ticketTo, this.ticketArrayTo, false);
      }
      if (this.ticketBack) {
        ticketBackInArray = this.isTicketActive(this.ticketBack, this.ticketArrayBack, true);
      }

      if (!ticketToInArray && !ticketBackInArray) {
        const params = this.getParamsObj(link);
        this.store.dispatch(ticketsLoadAction({ params }));
      }
    } else {
      const params = this.getParamsObj(link);
      this.store.dispatch(ticketsLoadAction({ params }));
    }
  }

  private isTicketActive(
    ticket: ExtendedTicketInterface,
    ticketArray: ExtendedTicketInterface[],
    isBack: boolean,
  ): boolean {
    const index = ticketArray.findIndex((val) => {
      return (
        val.departure_at === ticket.departure_at &&
        val.origin === ticket.origin &&
        val.destination === ticket.destination &&
        val.price === ticket.price &&
        val.flight_number === ticket.flight_number
      );
    });

    if (index >= 0) {
      this.store.dispatch(ticketsChangeActive({ index: ticketArray[index].index, isBack }));
      return true;
    }
    return false;
  }

  private updateTicketValues(): void {
    this.store.select(selectBookingOrderTicketTo).subscribe((val) => {
      this.ticketTo = val;
    });
    this.store.select(selectBookingOrderTicketBack).subscribe((val) => {
      this.ticketBack = val;
    });
    this.store.select(selectTicketsData).subscribe((val) => {
      this.ticketArrayTo = val;
    });
    this.store.select(selectTicketsBackData).subscribe((val) => {
      this.ticketArrayBack = val;
    });
    this.store.select(selectBookingOrderLink).subscribe((val) => {
      this.orderLink = val;
    });
  }
}
