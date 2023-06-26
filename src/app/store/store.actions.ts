import { createAction, props } from '@ngrx/store';
import { ConvertResponse, ExchangeRatesResponse, ExchangeRateHistoryResponse, ExchangeRateFluctuationResponse, Symbols } from '../services/api.interface';

export const getSymbols = createAction('[API] Get Symbols');
export const getSymbolsSuccess = createAction(
  '[API] Get Symbols Success',
  props<{ response: Symbols }>()
);
export const getSymbolsFailure = createAction('[API] Get Symbols Failure');

export const getLatestExchangeRates = createAction('[API] Get Latest Exchange Rates',
  props<{ symbols: string[] }>());
export const getLatestExchangeRatesSuccess = createAction(
  '[API] Get Latest Exchange Rates Success',
  props<{ response: ExchangeRatesResponse }>()
);
export const getLatestExchangeRatesFailure = createAction('[API] Get Latest Exchange Rates Failure');

export const getHistoricalExchangeRates = createAction('[API] Get Historical Exchange Rates', props<{ date: string, symbols: string[] }>());
export const getHistoricalExchangeRatesSuccess = createAction(
  '[API] Get Historical Exchange Rates Success',
  props<{ response: ExchangeRatesResponse }>()
);
export const getHistoricalExchangeRatesFailure = createAction('[API] Get Historical Exchange Rates Failure');

export const convertCurrency = createAction(
  '[API] Convert Currency',
  props<{ from: string; to: string; amount: number }>()
);
export const convertCurrencySuccess = createAction(
  '[API] Convert Currency Success',
  props<{ response: ConvertResponse }>()
);
export const convertCurrencyFailure = createAction('[API] Convert Currency Failure');

export const getExchangeRateHistory = createAction(
  '[API] Get Exchange Rate History',
  props<{ startDate: string; endDate: string, symbols: string[] }>()
);
export const getExchangeRateHistorySuccess = createAction(
  '[API] Get Exchange Rate History Success',
  props<{ response: ExchangeRateHistoryResponse }>()
);
export const getExchangeRateHistoryFailure = createAction('[API] Get Exchange Rate History Failure');

export const getExchangeRateFluctuation = createAction(
  '[API] Get Exchange Rate Fluctuation',
  props<{ startDate: string; endDate: string, symbols: string[] }>()
);
export const getExchangeRateFluctuationSuccess = createAction(
  '[API] Get Exchange Rate Fluctuation Success',
  props<{ response: ExchangeRateFluctuationResponse }>()
);
export const getExchangeRateFluctuationFailure = createAction('[API] Get Exchange Rate Fluctuation Failure');