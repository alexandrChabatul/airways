import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TicketsStateInterface } from '../store.models';

export const selectTicketsFeature = createFeatureSelector<TicketsStateInterface>('tickets');

export const selectTicketsData = createSelector(
  selectTicketsFeature,
  (formatsState: TicketsStateInterface) => formatsState.data,
);