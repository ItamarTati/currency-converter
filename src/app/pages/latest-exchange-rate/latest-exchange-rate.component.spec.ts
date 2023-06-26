import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LatestExchangeRateComponent } from './latest-exchange-rate.component';
import { Observable, of, defer } from 'rxjs';
import { ExchangeRatesResponse } from '../../services/api.interface';
import { getLatestExchangeRates } from '../../store/store.actions';
import { TestScheduler } from 'rxjs/testing';
import { delay } from 'rxjs/operators';

describe('LatestExchangeRateComponent', () => {
  let component: LatestExchangeRateComponent;
  let fixture: ComponentFixture<LatestExchangeRateComponent>;
  let store: any;
  let formBuilder: FormBuilder;
  let testScheduler: TestScheduler;

  beforeEach(async () => {
    store = {
      dispatch: jest.fn(),
      select: jest.fn().mockReturnValue(defer(() => of(null).pipe(delay(100)))),
    };

    formBuilder = new FormBuilder();

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LatestExchangeRateComponent],
      providers: [
        { provide: Store, useValue: store },
        { provide: FormBuilder, useValue: formBuilder },
      ],
    }).compileComponents();

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestExchangeRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.latestExchangeRateForm.value).toEqual({
      selectedSymbols: ['USD', 'GBP', 'EUR'],
    });
  });

  it('should dispatch getLatestExchangeRates action on form submission', () => {
    const symbols = ['USD', 'GBP', 'EUR'];

    component.latestExchangeRateForm.patchValue({
      selectedSymbols: symbols,
    });

    component.getLatestData({ date: new Date(), symbols });

    expect(store.dispatch).toHaveBeenCalledWith(
      getLatestExchangeRates({ symbols })
    );
  });

  it('should set latestExchangeRates$ from store select', async () => {
    const exchangeRatesResponse: ExchangeRatesResponse = {
      base: 'USD',
      date: '2023-01-16',
      rates: {
        EUR: 0.89,
        GBP: 0.78,
        USD: 1,
      },
    };

    const action = getLatestExchangeRates({ symbols: ['USD', 'GBP', 'EUR'] });

    jest.spyOn(store, 'select').mockReturnValue(of(exchangeRatesResponse));

    component.getLatestData({ date: new Date(), symbols: ['USD', 'GBP', 'EUR'] });

    expect(store.dispatch).toHaveBeenCalledWith(action);

    await fixture.whenStable();

    expect(component.latestExchangeRates$).toBeDefined();
    expect(component.latestExchangeRates$).toBeInstanceOf(Observable);

    component.latestExchangeRates$!.subscribe((latestExchangeRates) => {
      expect(latestExchangeRates).toEqual(exchangeRatesResponse);
    });
  });

  it('should return true when currency is selected', () => {
    component.latestExchangeRateForm.patchValue({
      selectedSymbols: ['USD', 'GBP', 'EUR'],
    });

    const isCurrencySelected = component.isCurrencySelected('USD');
    expect(isCurrencySelected).toBeTruthy();
  });

  it('should return false when currency is not selected', () => {
    component.latestExchangeRateForm.patchValue({
      selectedSymbols: ['GBP', 'EUR'],
    });

    const isCurrencySelected = component.isCurrencySelected('USD');
    expect(isCurrencySelected).toBeFalsy();
  });
});