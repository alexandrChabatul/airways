import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { TicketsService } from '../../services/tickets.service';
import {
  ticketsLoadAction,
  ticketsLoadFailureAction,
  ticketsLoadSuccessAction,
} from '../actions/tickets.actions';
import { ExtendedTicketInterface } from '../../models/ticket.models';

@Injectable()
export class TicketsEffect {
  tickets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ticketsLoadAction),
      switchMap(() => {
        return this.ticketsService.getTicketsArray().pipe(
          map((response: ExtendedTicketInterface[][]) => {
            return ticketsLoadSuccessAction({ data: response[0], dataBack: response[1] });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.warn(errorResponse);
            return of(ticketsLoadFailureAction());
          }),
        );
      }),
    );
  });

  constructor(private actions$: Actions, private ticketsService: TicketsService) {}
}
