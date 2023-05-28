import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HistoryStateInterface } from '../store.models';

export const selectUserFeature = createFeatureSelector<HistoryStateInterface>('user');

export const selectHistoryItems = createSelector(
  selectUserFeature,
  (historyState: HistoryStateInterface) => historyState.items,
);

export const selectHistoryCount = createSelector(
  selectUserFeature,
  (historyState: HistoryStateInterface) => historyState.items?.length || 0,
);
