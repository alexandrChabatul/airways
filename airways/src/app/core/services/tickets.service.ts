import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AviasalesApiService } from './aviasales-api.service';
import moment from 'moment';
import { Store } from '@ngrx/store';
import { selectCurrencyFormat } from '../store/selectors/formats.selectors';
import { forkJoin, of, map, Observable, switchMap, combineLatest } from 'rxjs';
import { ExtendedTicketInterface, TicketInterface } from '../models/ticket.models';
import { AutocompleteService } from './autocomplete.service';
import airportTimezone from 'airport-timezone';
import { AirportTimeZoneInterface } from '../models/airport-timezone.model';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private currency$ = this.store.select(selectCurrencyFormat);

  private currencyLowerCase = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: AviasalesApiService,
    private store: Store,
    private autocompleteService: AutocompleteService,
  ) {
    this.currency$.subscribe((val) => {
      this.currencyLowerCase = val.toLocaleLowerCase();
    });
  }

  public getTicketsArray(): Observable<ExtendedTicketInterface[][]> {
    const params = this.route.snapshot.queryParams;

    if (params['isRound'] === 'true') {
      return forkJoin([
        this.getRequestObservable(params, false),
        this.getRequestObservable(params, true),
      ]);
    }

    return forkJoin([this.getRequestObservable(params, false), of([])]);
  }

  private getRandomSeats(): number {
    const maxSeats = 100;
    const minSeats = 1;
    return Math.floor(Math.random() * (maxSeats - minSeats + 1)) + minSeats;
  }

  private getExtendedArray(
    array: TicketInterface[],
    dateString: string,
  ): Observable<ExtendedTicketInterface>[] {
    const dateNow = moment.utc();

    const ticketsWithAdditionalFields: Observable<ExtendedTicketInterface>[] = array.map(
      (item, index) => {
        const departureTicketString = moment(item.departure_at).format('MM-DD-YYYY').toString();
        const timeZone = moment.parseZone(item.departure_at).utcOffset() / 60;
        const dateTicket = moment.utc(item.departure_at);
        const destinationUtcOffset = airportTimezone.filter(
          (airport: AirportTimeZoneInterface) => airport.code === item.destination_airport,
        )[0].offset.dst;

        const originAutocomplete$ = this.autocompleteService.getAirportByCode(item.origin);
        const destinationAutocomplete$ = this.autocompleteService.getAirportByCode(
          item.destination,
        );

        return combineLatest([originAutocomplete$, destinationAutocomplete$]).pipe(
          map(([originAutocomplete, destinationAutocomplete]) => ({
            ...item,
            isActive: dateString === departureTicketString,
            index,
            utcOffset: `UTC${timeZone >= 0 ? `+${timeZone}` : timeZone}`,
            isOutdated: dateNow > dateTicket ? true : false,
            seats: this.getRandomSeats(),
            maxSeats: 100,
            originAutocomplete,
            destinationAutocomplete,
            destinationUtcOffset: `UTC${
              destinationUtcOffset >= 0 ? `+${destinationUtcOffset}` : destinationUtcOffset
            }`,
          })),
        );
      },
    );

    return ticketsWithAdditionalFields;
  }

  private getRequestObservable(
    params: Params,
    isBack: boolean,
  ): Observable<ExtendedTicketInterface[]> {
    let origin = params['origin'];
    let destination = params['destination'];
    let date = moment(params['departure'], 'MM-DD-YYYY');

    if (isBack) {
      //если билет возвратный то меняем местами origin и destination
      origin = params['destination'];
      destination = params['origin'];
      date = moment(params['arrival'], 'MM-DD-YYYY');
    }

    const monthToAdd = date.date() >= 15 ? 1 : -1; //if date is more than 15 then we'll request tickets for further month and vice versa
    const additionalMonthDeparture = date.clone().add(monthToAdd, 'months');

    const currentMonthTickets$ = this.apiService.getTicketsMapDyDate(
      origin,
      destination,
      date,
      this.currencyLowerCase,
    );

    const additionalMonthTickets$ = this.apiService.getTicketsMapDyDate(
      origin,
      destination,
      additionalMonthDeparture,
      this.currencyLowerCase,
    );

    return forkJoin([currentMonthTickets$, additionalMonthTickets$]).pipe(
      switchMap((elem: TicketInterface[][]) => {
        const ticketsArray = elem.flat();

        if (ticketsArray.length > 0) {
          const dateString = date.format('MM-DD-YYYY').toString();
          const ticketsWithAdditionalFields = this.getExtendedArray(ticketsArray, dateString);
          return forkJoin(ticketsWithAdditionalFields);
        }

        return of([]);
      }),
    );
  }
}
