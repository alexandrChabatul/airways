import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TicketsStateInterface } from '../store.models';

export const selectTicketsFeature = createFeatureSelector<TicketsStateInterface>('tickets');

export const selectTicketsData = createSelector(
  selectTicketsFeature,
  (ticketsState: TicketsStateInterface) => ticketsState.data,
);

export const selectTicketsBackData = createSelector(
  selectTicketsFeature,
  (ticketsState: TicketsStateInterface) => ticketsState.dataBack,
);

export const selectActiveTicket = createSelector(
  selectTicketsFeature,
  (ticketsState: TicketsStateInterface) => {
    return ticketsState.data.find((el) => el.isActive);
  },
);

export const selectActiveTicketBack = createSelector(
  selectTicketsFeature,
  (ticketsState: TicketsStateInterface) => {
    return ticketsState.dataBack.find((el) => el.isActive);
  },
);
