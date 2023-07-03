import { storeReducer, initialState } from './store.reducer';
import * as StoreActions from './store.actions';
import {
  ConvertResponse,
  ExchangeRatesResponse,
  ExchangeRateHistoryResponse,
  ExchangeRateFluctuationResponse,
} from '../services/api.interface';

const mockExchangeRatesResponse: ExchangeRatesResponse = {
  base: 'USD',
  date: '2023-06-25',
  rates: {
    EUR: 0.87,
    GBP: 0.75,
    JPY: 109.48,
  },
};

const mockConvertResponse: ConvertResponse = {
  success: true,
  query: {
    from: 'USD',
    to: 'EUR',
    amount: 100,
  },
  info: {
    rate: 0.87,
    timestamp: 1624617600,
  },
  historical: false,
  date: '2023-06-25',
  result: 87,
};

const mockExchangeRateHistoryResponse: ExchangeRateHistoryResponse = {
  timeseries: true,
  start_date: '2023-06-20',
  end_date: '2023-06-25',
  base: 'USD',
  rates: {
    '2023-06-20': {
      EUR: 0.85,
      GBP: 0.73,
      JPY: 108.78,
    },
    '2023-06-21': {
      EUR: 0.86,
      GBP: 0.74,
      JPY: 109.12,
    },
  },
};

const mockExchangeRateFluctuationResponse: ExchangeRateFluctuationResponse = {
  fluctuation: true,
  start_date: '2023-06-01',
  end_date: '2023-06-30',
  base: 'USD',
  rates: {
    EUR: {
      start_rate: 0.86,
      end_rate: 0.88,
      change: 0.02,
    },
    GBP: {
      start_rate: 0.74,
      end_rate: 0.76,
      change: 0.02,
    },
  },
};

describe('storeReducer', () => {
  it('should set loading to true and update symbols when getSymbols action is dispatched', () => {
    const action = StoreActions.getSymbols();
    const state = storeReducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  it('should set loading to false and symbols when getSymbolsSuccess action is dispatched', () => {
    const symbols = {
      symbols: {
        USD: 'United States Dollar',
        EUR: 'Euro',
        GBP: 'British Pound',
      },
      success: true,
    };
    const action = StoreActions.getSymbolsSuccess({ response: symbols });
    const state = storeReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.symbols).toEqual(symbols);
  });

  it('should set loading to false and error to true when getSymbolsFailure action is dispatched', () => {
    const action = StoreActions.getSymbolsFailure();
    const state = storeReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(true);
  });

  it('should set loading to true and update symbols when getLatestExchangeRates action is dispatched', () => {
    const symbols = ['GBP', 'USD', 'EUR'];
    const action = StoreActions.getLatestExchangeRates({ symbols });
    const state = storeReducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  it('should set loading to false and latestExchangeRates when getLatestExchangeRatesSuccess action is dispatched', () => {
    const action = StoreActions.getLatestExchangeRatesSuccess({
      response: mockExchangeRatesResponse,
    });
    const state = storeReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.latestExchangeRates).toEqual(mockExchangeRatesResponse);
  });

  it('should set loading to false and error to true when getLatestExchangeRatesFailure action is dispatched', () => {
    const action = StoreActions.getLatestExchangeRatesFailure();
    const state = storeReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(true);
  });

  it('should set loading to true when getHistoricalExchangeRates action is dispatched', () => {
    const symbols = ['GBP', 'USD', 'EUR'];
    const action = StoreActions.getHistoricalExchangeRates({
      date: '2023-06-25',
      symbols,
    });
    const state = storeReducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  it('should set loading to false and historicalExchangeRates when getHistoricalExchangeRatesSuccess action is dispatched', () => {
    const action = StoreActions.getHistoricalExchangeRatesSuccess({
      response: mockExchangeRatesResponse,
    });
    const state = storeReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.historicalExchangeRates).toEqual(mockExchangeRatesResponse);
  });

  it('should set loading to false and error to true when getHistoricalExchangeRatesFailure action is dispatched', () => {
    const action = StoreActions.getHistoricalExchangeRatesFailure();
    const state = storeReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(true);
  });

  it('should set loading to true when convertCurrency action is dispatched', () => {
    const action = StoreActions.convertCurrency({
      from: 'USD',
      to: 'EUR',
      amount: 100,
    });
    const state = storeReducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  it('should set loading to false and convertedCurrency when convertCurrencySuccess action is dispatched', () => {
    const action = StoreActions.convertCurrencySuccess({
      response: mockConvertResponse,
    });
    const state = storeReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.convertedCurrency).toEqual(mockConvertResponse);
  });

  it('should set loading to false and error to true when convertCurrencyFailure action is dispatched', () => {
    const action = StoreActions.convertCurrencyFailure();
    const state = storeReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(true);
  });

  it('should set loading to true when getExchangeRateHistory action is dispatched', () => {
    const symbols = ['GBP', 'USD', 'EUR'];
    const action = StoreActions.getExchangeRateHistory({
      startDate: '2023-06-20',
      endDate: '2023-06-25',
      symbols,
    });
    const state = storeReducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  it('should set loading to false and exchangeRateHistory when getExchangeRateHistorySuccess action is dispatched', () => {
    const action = StoreActions.getExchangeRateHistorySuccess({
      response: mockExchangeRateHistoryResponse,
    });
    const state = storeReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.exchangeRateHistory).toEqual(mockExchangeRateHistoryResponse);
  });

  it('should set loading to false and error to true when getExchangeRateHistoryFailure action is dispatched', () => {
    const action = StoreActions.getExchangeRateHistoryFailure();
    const state = storeReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(true);
  });

  it('should set loading to true when getExchangeRateFluctuation action is dispatched', () => {
    const symbols = ['GBP', 'USD', 'EUR'];
    const action = StoreActions.getExchangeRateFluctuation({
      startDate: '2023-06-01',
      endDate: '2023-06-30',
      symbols,
    });
    const state = storeReducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  it('should set loading to false and exchangeRateFluctuation when getExchangeRateFluctuationSuccess action is dispatched', () => {
    const action = StoreActions.getExchangeRateFluctuationSuccess({
      response: mockExchangeRateFluctuationResponse,
    });
    const state = storeReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.exchangeRateFluctuation).toEqual(
      mockExchangeRateFluctuationResponse
    );
  });

  it('should set loading to false and error to true when getExchangeRateFluctuationFailure action is dispatched', () => {
    const action = StoreActions.getExchangeRateFluctuationFailure();
    const state = storeReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(true);
  });
});
