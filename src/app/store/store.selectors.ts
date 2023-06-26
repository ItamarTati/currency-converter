import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './store.reducer';

export const selectState = createFeatureSelector<State>('yourFeatureName');

export const selectSymbols = createSelector(
  selectState,
  (state: State) => state.symbols
);

export const selectLatestExchangeRates = createSelector(
  selectState,
  (state: State) => state.latestExchangeRates
);

export const selectHistoricalExchangeRates = createSelector(
  selectState,
  (state: State) => state.historicalExchangeRates
);

export const selectConvertedCurrency = createSelector(
  selectState,
  (state: State) => state.convertedCurrency
);

export const selectExchangeRateHistory = createSelector(
  selectState,
  (state: State) => state.exchangeRateHistory
);

export const selectExchangeRateFluctuation = createSelector(
  selectState,
  (state: State) => state.exchangeRateFluctuation
);

export const selectLoading = createSelector(
  selectState,
  (state: State) => state.loading
);

export const selectError = createSelector(
  selectState,
  (state: State) => state.error
);