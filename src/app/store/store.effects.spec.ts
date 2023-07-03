import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { StoreEffects } from './store.effects';
import * as storeActions from './store.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../services/api.service';

describe('StoreEffects', () => {
  let actions$: Observable<any>;
  let effects: StoreEffects;
  let apiService: ApiService;
  let snackBar: MatSnackBar;
  const errorMessage = 'Error message';
  const snackBarPosition = {
    duration: 5000,
    verticalPosition: 'top',
  };
  const mockExchangeRatesResponse = {
    base: 'USD',
    date: '2023-06-25',
    rates: {
      EUR: 0.87,
      GBP: 0.75,
      JPY: 109.48,
    },
  };

  const mockHistoricalExchangeRatesResponse = {
    timeseries: true,
    historical: true,
    base: 'EUR',
    date: '2013-03-16',
    rates: {
      USD: 1.307716,
      AUD: 1.256333,
      CAD: 1.333812,
      PLN: 4.150819,
      MXN: 16.259128,
    },
  };

  const mockConvertResponse = {
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

  const mockExchangeRateHistoryResponse = {
    timeseries: true,
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

  const mockExchangeRateFluctuationResponse = {
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StoreEffects,
        provideMockActions(() => actions$),
        {
          provide: ApiService,
          useValue: {
            getLatestExchangeRates: jest.fn(() =>
              of(mockExchangeRatesResponse)
            ),
            getHistoricalExchangeRates: jest.fn((date: string) =>
              of(mockHistoricalExchangeRatesResponse)
            ),
            convertCurrency: jest.fn(
              (from: string, to: string, amount: number) =>
                of(mockConvertResponse)
            ),
            getExchangeRateHistory: jest.fn(
              (startDate: string, endDate: string) =>
                of(mockExchangeRateHistoryResponse)
            ),
            getExchangeRateFluctuation: jest.fn(
              (startDate: string, endDate: string) =>
                of(mockExchangeRateFluctuationResponse)
            ),
          },
        },
        {
          provide: MatSnackBar,
          useValue: {
            open: jest.fn(),
          },
        },
      ],
    });

    effects = TestBed.inject(StoreEffects);
    apiService = TestBed.inject(ApiService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  describe('getSymbols$', () => {
    it('should dispatch getSymbolsSuccess on successful API call', () => {
      const symbols = {
        symbols: {
          USD: 'United States Dollar',
          EUR: 'Euro',
          GBP: 'British Pound',
        },
        success: true,
      };
      actions$ = of(storeActions.getSymbols());

      effects.getSymbols$.subscribe((result) => {
        expect(result).toEqual(
          storeActions.getSymbolsSuccess({ response: symbols })
        );
        expect(apiService.getSymbols).toHaveBeenCalled();
        expect(snackBar.open).not.toHaveBeenCalled();
      });
    });

    it('should dispatch getSymbolsFailure and show snackbar on API call failure', () => {
      const error = new Error(errorMessage);
      actions$ = of(storeActions.getSymbols());

      effects.getSymbols$.subscribe((result) => {
        expect(result).toEqual(storeActions.getSymbolsFailure());
        expect(apiService.getSymbols).toHaveBeenCalled();
        expect(snackBar.open).toHaveBeenCalledWith(
          errorMessage,
          'Dismiss',
          snackBarPosition
        );
      });
    });
  });

  describe('getLatestExchangeRates$', () => {
    it('should dispatch getLatestExchangeRatesSuccess on successful API call', () => {
      const symbols = ['GBP', 'USD', 'AUD', 'CAD', 'PLN', 'MXN'];
      actions$ = of(storeActions.getLatestExchangeRates({ symbols }));

      effects.getLatestExchangeRates$.subscribe((result) => {
        expect(result).toEqual(
          storeActions.getLatestExchangeRatesSuccess({
            response: mockExchangeRatesResponse,
          })
        );
        expect(apiService.getLatestExchangeRates).toHaveBeenCalledWith(symbols);
        expect(snackBar.open).not.toHaveBeenCalled();
      });
    });

    it('should dispatch getLatestExchangeRatesFailure and show snackbar on API call failure', () => {
      const symbols = ['GBP', 'USD', 'AUD', 'CAD', 'PLN', 'MXN'];
      actions$ = of(storeActions.getLatestExchangeRates({ symbols }));

      effects.getLatestExchangeRates$.subscribe((result) => {
        expect(result).toEqual(storeActions.getLatestExchangeRatesFailure());
        expect(apiService.getLatestExchangeRates).toHaveBeenCalled();
        expect(snackBar.open).toHaveBeenCalledWith(
          errorMessage,
          'Dismiss',
          snackBarPosition
        );
      });
    });
  });

  describe('getHistoricalExchangeRates$', () => {
    it('should dispatch getHistoricalExchangeRatesSuccess on successful API call', () => {
      const date = '2023-06-25';
      const symbols = ['GBP', 'USD', 'AUD', 'CAD', 'PLN', 'MXN'];
      actions$ = of(storeActions.getHistoricalExchangeRates({ date, symbols }));

      effects.getHistoricalExchangeRates$.subscribe((result) => {
        expect(result).toEqual(
          storeActions.getHistoricalExchangeRatesSuccess({
            response: mockHistoricalExchangeRatesResponse,
          })
        );
        expect(apiService.getHistoricalExchangeRates).toHaveBeenCalledWith(
          date
        );
        expect(snackBar.open).not.toHaveBeenCalled();
      });
    });

    it('should dispatch getHistoricalExchangeRatesFailure and show snackbar on API call failure', () => {
      const date = '2023-06-25';

      actions$ = of(storeActions.getHistoricalExchangeRatesFailure());

      effects.getHistoricalExchangeRates$.subscribe((result) => {
        expect(result).toEqual(
          storeActions.getHistoricalExchangeRatesFailure()
        );
        expect(apiService.getHistoricalExchangeRates).toHaveBeenCalledWith(
          date
        );
        expect(snackBar.open).toHaveBeenCalledWith(
          errorMessage,
          'Dismiss',
          snackBarPosition
        );
      });
    });
  });

  describe('convertCurrency$', () => {
    it('should dispatch convertCurrencySuccess on successful API call', () => {
      const from = 'USD';
      const to = 'EUR';
      const amount = 100;
      actions$ = of(storeActions.convertCurrency({ from, to, amount }));

      effects.convertCurrency$.subscribe((result) => {
        expect(result).toEqual(
          storeActions.convertCurrencySuccess({ response: mockConvertResponse })
        );
        expect(apiService.convertCurrency).toHaveBeenCalledWith(
          from,
          to,
          amount
        );
        expect(snackBar.open).not.toHaveBeenCalled();
      });
    });

    it('should dispatch convertCurrencyFailure and show snackbar on API call failure', () => {
      const from = 'USD';
      const to = 'EUR';
      const amount = 100;
      const error = new Error(errorMessage);

      actions$ = of(storeActions.convertCurrencyFailure());

      effects.convertCurrency$.subscribe((result) => {
        expect(result).toEqual(storeActions.convertCurrencyFailure());
        expect(apiService.convertCurrency).toHaveBeenCalledWith(
          from,
          to,
          amount
        );
        expect(snackBar.open).toHaveBeenCalledWith(
          errorMessage,
          'Dismiss',
          snackBarPosition
        );
      });
    });
  });

  describe('getExchangeRateHistory$', () => {
    it('should dispatch getExchangeRateHistorySuccess on successful API call', () => {
      const startDate = '2023-06-01';
      const endDate = '2023-06-30';
      const symbols = ['GBP', 'USD', 'AUD', 'CAD', 'PLN', 'MXN'];

      actions$ = of(
        storeActions.getExchangeRateHistory({ startDate, endDate, symbols })
      );

      effects.getExchangeRateHistory$.subscribe((result) => {
        expect(result).toEqual(
          storeActions.getExchangeRateHistorySuccess({
            response: mockExchangeRateHistoryResponse,
          })
        );
        expect(apiService.getExchangeRateHistory).toHaveBeenCalledWith(
          startDate,
          endDate
        );
        expect(snackBar.open).not.toHaveBeenCalled();
      });
    });

    it('should dispatch getExchangeRateHistoryFailure and show snackbar on API call failure', () => {
      const startDate = '2023-06-01';
      const endDate = '2023-06-30';

      actions$ = of(storeActions.getExchangeRateHistoryFailure());

      effects.getExchangeRateHistory$.subscribe((result) => {
        expect(result).toEqual(storeActions.getExchangeRateHistoryFailure());
        expect(apiService.getExchangeRateHistory).toHaveBeenCalledWith(
          startDate,
          endDate
        );
        expect(snackBar.open).toHaveBeenCalledWith(
          errorMessage,
          'Dismiss',
          snackBarPosition
        );
      });
    });
  });

  describe('getExchangeRateFluctuation$', () => {
    it('should dispatch getExchangeRateFluctuationSuccess on successful API call', () => {
      const startDate = '2023-06-01';
      const endDate = '2023-06-30';
      const symbols = ['GBP', 'USD', 'AUD', 'CAD', 'PLN', 'MXN'];

      actions$ = of(
        storeActions.getExchangeRateFluctuation({ startDate, endDate, symbols })
      );

      effects.getExchangeRateFluctuation$.subscribe((result) => {
        expect(result).toEqual(
          storeActions.getExchangeRateFluctuationSuccess({
            response: mockExchangeRateFluctuationResponse,
          })
        );
        expect(apiService.getExchangeRateFluctuation).toHaveBeenCalledWith(
          startDate,
          endDate
        );
        expect(snackBar.open).not.toHaveBeenCalled();
      });
    });

    it('should dispatch getExchangeRateFluctuationFailure and show snackbar on API call failure', () => {
      const startDate = '2023-06-01';
      const endDate = '2023-06-30';

      actions$ = of(storeActions.getExchangeRateFluctuationFailure());

      effects.getExchangeRateFluctuation$.subscribe((result) => {
        expect(result).toEqual(
          storeActions.getExchangeRateFluctuationFailure()
        );
        expect(apiService.getExchangeRateFluctuation).toHaveBeenCalledWith(
          startDate,
          endDate
        );
        expect(snackBar.open).toHaveBeenCalledWith(
          errorMessage,
          'Dismiss',
          snackBarPosition
        );
      });
    });
  });
});
