import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserDetailsStateInterface } from '../store.models';
import { PassengerArrayInterface } from '../../models/booking.model';

export const selectDetails = createFeatureSelector<UserDetailsStateInterface>('details');

export const selectDetailsOrder = createSelector(
  selectDetails,
  (detailsState: UserDetailsStateInterface) => detailsState.details?.order || null,
);

export const selectDetailsPassengers = createSelector(
  selectDetails,
  (detailsState: UserDetailsStateInterface) => detailsState.details?.passengers || null,
);

export const selectDetailsTicketsPrice = createSelector(
  selectDetails,
  (detailsState: UserDetailsStateInterface) => {
    let price = 0;
    if (detailsState.details) {
      if (detailsState.details.order.ticket) {
        price += detailsState.details.order.ticket.price;
      }

      if (detailsState.details.order.ticketBack) {
        price += detailsState.details.order.ticketBack.price;
      }
    }

    return price;
  },
);

export const selectDetailsPassengerArray = createSelector(
  selectDetails,
  (detailsState: UserDetailsStateInterface) => {
    const passengers: PassengerArrayInterface[] = [];
    if (detailsState.details) {
      if (detailsState.details.passengers.adult) {
        for (const id in detailsState.details.passengers.adult) {
          passengers.push({ ...detailsState.details.passengers.adult[id], type: 'adult' });
        }
      }

      if (detailsState.details.passengers.child) {
        for (const id in detailsState.details.passengers.child) {
          passengers.push({ ...detailsState.details.passengers.child[id], type: 'child' });
        }
      }

      if (detailsState.details.passengers.infant) {
        for (const id in detailsState.details.passengers.infant) {
          passengers.push({ ...detailsState.details.passengers.infant[id], type: 'infant' });
        }
      }
    }

    return passengers;
  },
);
