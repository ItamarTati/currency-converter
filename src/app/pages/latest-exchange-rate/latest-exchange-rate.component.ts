import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ExchangeRatesResponse } from '../../services/api.interface';
import { getLatestExchangeRates } from '../../store/store.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-latest-exchange-rate',
  templateUrl: './latest-exchange-rate.component.html',
  styleUrls: ['./latest-exchange-rate.component.scss'],
})
export class LatestExchangeRateComponent implements OnInit {
  public latestExchangeRateForm!: FormGroup;
  public latestExchangeRates$!: Observable<ExchangeRatesResponse>;
  public buttonMessage = 'Get the lastest exchange rates';

  constructor(
    private readonly store: Store<{
      store: { latestExchangeRates: ExchangeRatesResponse };
    }>,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.latestExchangeRateForm = this.formBuilder.group({
      selectedSymbols: [['USD', 'GBP', 'EUR'], [Validators.required]],
    });

    this.getLatestData({ date: new Date(), symbols: ['USD', 'GBP', 'EUR'] });
  }

  public getLatestData(event: { date: Date; symbols: string[] }) {
    this.store.dispatch(getLatestExchangeRates({ symbols: event.symbols }));
    this.latestExchangeRates$ = this.store.select(
      (state) => state.store.latestExchangeRates
    );
  }

  public isCurrencySelected(currency: string): boolean {
    const selectedCurrencies =
      this.latestExchangeRateForm.get('selectedSymbols')?.value;
    return selectedCurrencies && selectedCurrencies.includes(currency);
  }
}
