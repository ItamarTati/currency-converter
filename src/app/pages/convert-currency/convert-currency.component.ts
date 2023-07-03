import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ConvertResponse } from 'src/app/services/api.interface';
import { Store } from '@ngrx/store';
import { convertCurrency } from '../../store/store.actions';

const sameCurrencyValidator: ValidatorFn = (control: AbstractControl) => {
  const parentFormGroup = control.parent as FormGroup;
  const sourceCurrency = parentFormGroup?.get('sourceCurrency');
  const destinationCurrency = parentFormGroup?.get('destinationCurrency');

  if (sourceCurrency?.value === destinationCurrency?.value) {
    destinationCurrency?.setErrors({
      sameCurrency: true,
    });
    sourceCurrency?.setErrors({
      sameCurrency: true,
    });
    return {
      sameCurrency: true,
    };
  } else {
    destinationCurrency?.setErrors(null);
    sourceCurrency?.setErrors(null);
  }
  return null;
};

@Component({
  selector: 'app-convert-currency',
  templateUrl: './convert-currency.component.html',
  styleUrls: ['./convert-currency.component.scss'],
})
export class ConvertCurrencyComponent implements OnInit {
  public currencyConversionForm: FormGroup = new FormGroup({});
  public convertResponse$: Observable<ConvertResponse> | undefined;
  public buttonMessage = 'Convert currency';
  public convertedAmount = 1;
  public initialSourceCurrency = 'EUR';
  public initialDestinationCurrency = 'USD';
  constructor(
    private readonly store: Store<{
      store: { convertedCurrency: ConvertResponse };
    }>,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.currencyConversionForm = this.formBuilder.group({
      sourceCurrency: [
        this.initialSourceCurrency,
        [Validators.required, sameCurrencyValidator],
      ],
      amount: [this.convertedAmount, [Validators.required]],
      destinationCurrency: [
        this.initialDestinationCurrency,
        [Validators.required, sameCurrencyValidator],
      ],
    });
    this.convertToCurrency({
      from: this.initialSourceCurrency,
      to: this.initialDestinationCurrency,
      amount: this.convertedAmount,
    });
  }
  public convertToCurrency(event: {
    from: string;
    to: string;
    amount: number;
  }) {
    this.convertedAmount = event.amount;
    this.store.dispatch(convertCurrency(event));
    this.convertResponse$ = this.store.select(
      (state) => state.store.convertedCurrency
    );
  }
}
