import { createReducer, on, Action } from '@ngrx/store';
import * as StoreActions from './store.actions';
import { ExchangeRatesResponse, ConvertResponse, ExchangeRateHistoryResponse, ExchangeRateFluctuationResponse, Symbols } from '../services/api.interface';

export interface State {
  latestExchangeRates: ExchangeRatesResponse | null;
  historicalExchangeRates: ExchangeRatesResponse | null;
  convertedCurrency: ConvertResponse | null;
  exchangeRateHistory: ExchangeRateHistoryResponse | null;
  exchangeRateFluctuation: ExchangeRateFluctuationResponse | null;
  symbols: Symbols | null;
  loading: boolean;
  error: boolean;
}



export const initialState: State = {
  latestExchangeRates: null,
  historicalExchangeRates: null,
  convertedCurrency: null,
  exchangeRateHistory: null,
  exchangeRateFluctuation: null,
  symbols: null,
  loading: false,
  error: false,
};

export const storeReducer = createReducer(
  initialState,
  on(StoreActions.getLatestExchangeRates, (state, { symbols }) => ({
    ...state,
    loading: true,
  })),
  on(StoreActions.getLatestExchangeRatesSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    latestExchangeRates: response,
  })),
  on(StoreActions.getLatestExchangeRatesFailure, (state) => ({
    ...state,
    loading: false,
    error: true,
  })),
  on(StoreActions.getHistoricalExchangeRates, (state, { date, symbols }) => ({ ...state, loading: true })),
  on(StoreActions.getHistoricalExchangeRatesSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    historicalExchangeRates: response,
  })),
  on(StoreActions.getHistoricalExchangeRatesFailure, (state) => ({ ...state, loading: false, error: true })),
  on(StoreActions.convertCurrency, (state, { from, to, amount }) => ({ ...state, loading: true })),
  on(StoreActions.convertCurrencySuccess, (state, { response }) => ({
    ...state,
    loading: false,
    convertedCurrency: response,
  })),
  on(StoreActions.convertCurrencyFailure, (state) => ({ ...state, loading: false, error: true })),
  on(StoreActions.getExchangeRateHistory, (state, { startDate, endDate, symbols }) => ({ ...state, loading: true })),
  on(StoreActions.getExchangeRateHistorySuccess, (state, { response }) => ({
    ...state,
    loading: false,
    exchangeRateHistory: response,
  })),
  on(StoreActions.getExchangeRateHistoryFailure, (state) => ({ ...state, loading: false, error: true })),
  on(StoreActions.getExchangeRateFluctuation, (state, { startDate, endDate, symbols }) => ({ ...state, loading: true })),
  on(StoreActions.getExchangeRateFluctuationSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    exchangeRateFluctuation: response,
  })),
  on(StoreActions.getExchangeRateFluctuationFailure, (state) => ({ ...state, loading: false, error: true })),
  on(StoreActions.getSymbols, (state) => ({ ...state, loading: true })),
  on(StoreActions.getSymbolsSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    symbols: response,
  })),
  on(StoreActions.getSymbolsFailure, (state) => ({ ...state, loading: false, error: true }))
);

export function reducer(state: State | undefined, action: Action) {
  return storeReducer(state, action);
}