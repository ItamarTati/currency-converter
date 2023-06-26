import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ExchangeRatesResponse } from '../../services/api.interface';
import { getHistoricalExchangeRates } from '../../store/store.actions';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

function futureDateValidator(previousDate: Date | null): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selectedDate: Date = control.value;
    const currentDate: Date = new Date();

    if (selectedDate > currentDate || selectedDate.getTime() === (previousDate?.getTime() || 0)) {
      control.setErrors({ futureDate: true });
      return { futureDate: true };
    }

    return null;
  };
}

@Component({
  selector: 'app-historical-exchange-rate',
  templateUrl: './historical-exchange-rate.component.html',
  styleUrls: ['./historical-exchange-rate.component.scss']
})
export class HistoricalExchangeRateComponent implements OnInit {
  public historicalExchangeRateForm: FormGroup = new FormGroup({});
  public historicalExchangeRates$: Observable<ExchangeRatesResponse> | undefined;
  public chosenDate: Date = new Date('2013-03-16');
  public chosenSymbols: string[] = ['USD', 'GBP', 'EUR'];

  constructor(
    private readonly store: Store<{ store: { historicalExchangeRates: ExchangeRatesResponse } }>,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.historicalExchangeRateForm = this.formBuilder.group({
      selectedDate: [this.chosenDate, [Validators.required, futureDateValidator(this.chosenDate)]],
      selectedSymbols: [this.chosenSymbols, [Validators.required]]
    });

    this.getHistoricalData({ date: this.chosenDate, symbols: this.chosenSymbols });

    if (this.historicalExchangeRateForm.get('selectedDate')) {
      this.historicalExchangeRateForm.get('selectedDate')!.markAsTouched();
    }
  }

  public getHistoricalData(event: { date: Date, symbols: string[] }) {
    this.chosenDate = event.date;

    this.store.dispatch(getHistoricalExchangeRates({
      date: this.chosenDate.toISOString().substring(0, 10),
      symbols: event.symbols
    }));

    this.historicalExchangeRates$ = this.store.select(state => state.store.historicalExchangeRates);
  }
}


