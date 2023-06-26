import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { ApiService } from '../services/api.service';
import * as storeActions from './store.actions';

@Injectable()
export class StoreEffects {
  private readonly snackbarDuration = 5000;
  private readonly snackbarVerticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) { }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: this.snackbarDuration,
      verticalPosition: this.snackbarVerticalPosition
    });
  }


  getSymbols$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.getSymbols),
      switchMap(() =>
        this.apiService.getSymbols().pipe(
          map(response => storeActions.getSymbolsSuccess({ response })),
          catchError(() => of(storeActions.getSymbolsFailure()))
        )
      )
    )
  );

  getSymbolsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.getSymbolsSuccess),
      tap(() => {
        const message = 'Symbols loaded successfully';
        this.showSnackbar(message);
      })
    ),
    { dispatch: false }
  );

  getSymbolsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.getSymbolsFailure),
      tap(() => {
        const message = 'Failed to load symbols';
        this.showSnackbar(message);
      })
    ),
    { dispatch: false }
  );

  getLatestExchangeRates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.getLatestExchangeRates),
      switchMap(({ symbols }) =>
        this.apiService.getLatestExchangeRates(symbols).pipe(
          map(response => storeActions.getLatestExchangeRatesSuccess({ response })),
          catchError(error => of(storeActions.getLatestExchangeRatesFailure()))
        )
      )
    )
  );

  getLatestExchangeRatesSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.getLatestExchangeRatesSuccess),
      tap(() => {
        const message = 'Latest exchange rates loaded successfully';
        this.showSnackbar(message);
      })
    ),
    { dispatch: false }
  );

  getLatestExchangeRatesFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.getLatestExchangeRatesFailure),
      tap(() => {
        const message = 'Failed to load latest exchange rates';
        this.showSnackbar(message);
      })
    ),
    { dispatch: false }
  );

  getHistoricalExchangeRates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.getHistoricalExchangeRates),
      switchMap(({ date, symbols }) =>
        this.apiService.getHistoricalExchangeRates(date, symbols).pipe(
          map(response => storeActions.getHistoricalExchangeRatesSuccess({ response })),
          catchError(error => of(storeActions.getHistoricalExchangeRatesFailure()))
        )
      )
    )
  );

  getHistoricalExchangeRatesSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.getHistoricalExchangeRatesSuccess),
      tap(() => {
        const message = 'Historical exchange rates loaded successfully';
        this.showSnackbar(message);
      })
    ),
    { dispatch: false }
  );

  getHistoricalExchangeRatesFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.getHistoricalExchangeRatesFailure),
      tap(() => {
        const message = 'Failed to load historical exchange rates';
        this.showSnackbar(message);
      })
    ),
    { dispatch: false }
  );

  convertCurrency$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.convertCurrency),
      switchMap(({ from, to, amount }) =>
        this.apiService.convertCurrency(from, to, amount).pipe(
          map(response => storeActions.convertCurrencySuccess({ response })),
          catchError(error => of(storeActions.convertCurrencyFailure()))
        )
      )
    )
  );

  convertCurrencySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.convertCurrencySuccess),
      tap(() => {
        const message = 'Currency conversion successful';
        this.showSnackbar(message);
      })
    ),
    { dispatch: false }
  );

  convertCurrencyFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.convertCurrencyFailure),
      tap(() => {
        const message = 'Failed to convert currency';
        this.showSnackbar(message);
      })
    ),
    { dispatch: false }
  );

  getExchangeRateHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.getExchangeRateHistory),
      switchMap(({ startDate, endDate, symbols }) =>
        this.apiService.getExchangeRateHistory(startDate, endDate, symbols).pipe(
          map(response => storeActions.getExchangeRateHistorySuccess({ response })),
          catchError(error => of(storeActions.getExchangeRateHistoryFailure()))
        )
      )
    )
  );

  getExchangeRateHistorySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.getExchangeRateHistorySuccess),
      tap(() => {
        const message = 'Exchange rate history loaded successfully';
        this.showSnackbar(message);
      })
    ),
    { dispatch: false }
  );

  getExchangeRateHistoryFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.getExchangeRateHistoryFailure),
      tap(() => {
        const message = 'Failed to load exchange rate history';
        this.showSnackbar(message);
      })
    ),
    { dispatch: false }
  );

  getExchangeRateFluctuation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.getExchangeRateFluctuation),
      switchMap(({ startDate, endDate, symbols }) =>
        this.apiService.getExchangeRateFluctuation(startDate, endDate, symbols).pipe(
          map(response => storeActions.getExchangeRateFluctuationSuccess({ response })),
          catchError(error => of(storeActions.getExchangeRateFluctuationFailure()))
        )
      )
    )
  );

  getExchangeRateFluctuationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.getExchangeRateFluctuationSuccess),
      tap(() => {
        const message = 'Exchange rate fluctuation loaded successfully';
        this.showSnackbar(message);
      })
    ),
    { dispatch: false }
  );

  getExchangeRateFluctuationFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.getExchangeRateFluctuationFailure),
      tap(() => {
        const message = 'Failed to load exchange rate fluctuation';
        this.showSnackbar(message);
      })
    ),
    { dispatch: false }
  );
}