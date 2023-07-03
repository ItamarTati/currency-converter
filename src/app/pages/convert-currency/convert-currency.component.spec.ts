import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { convertCurrency } from '../../store/store.actions';
import { ConvertCurrencyComponent } from './convert-currency.component';

describe('ConvertCurrencyComponent', () => {
  let component: ConvertCurrencyComponent;
  let fixture: ComponentFixture<ConvertCurrencyComponent>;
  let mockStore: MockStore;
  const initialState = {
    store: {
      convertedCurrency: null,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConvertCurrencyComponent],
      imports: [ReactiveFormsModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertCurrencyComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(
      component.currencyConversionForm.get('sourceCurrency')?.value
    ).toEqual(component.initialSourceCurrency);
    expect(component.currencyConversionForm.get('amount')?.value).toEqual(
      component.convertedAmount
    );
    expect(
      component.currencyConversionForm.get('destinationCurrency')?.value
    ).toEqual(component.initialDestinationCurrency);
  });

  it('should dispatch convertCurrency action on convertToCurrency method call', () => {
    const spy = jest.spyOn(mockStore, 'dispatch');
    const event = {
      from: 'EUR',
      to: 'USD',
      amount: 1,
    };
    component.convertToCurrency(event);
    expect(spy).toHaveBeenCalledWith(convertCurrency(event));
  });

  it('should update convertedAmount and convertResponse$ on convertToCurrency method call', () => {
    const event = {
      from: 'EUR',
      to: 'USD',
      amount: 1,
    };
    const convertResponse = {
      success: true,
      query: {
        amount: 1,
        to: 'USD',
      },
    };
    mockStore.overrideSelector('store.convertedCurrency', convertResponse);
    component.convertToCurrency(event);
    expect(component.convertedAmount).toEqual(event.amount);
    expect(component.convertResponse$).toBeInstanceOf(Observable);
  });

  it('should display the converted amount if convertResponse success is true', () => {
    const convertResponse = {
      success: true,
      query: {
        amount: 100,
        to: 'USD',
        from: 'EUR',
      },
      info: {
        rate: 1,
        timestamp: 1,
      },
      historical: true,
      date: '',
      result: 1,
    };
    component.convertResponse$ = of(convertResponse);
    fixture.detectChanges();
    const convertedAmountElement = fixture.nativeElement.querySelector('p');
    expect(convertedAmountElement.textContent).toContain('100');
  });

  it('should display the loading template if convertResponse is undefined', () => {
    component.convertResponse$ = undefined;
    fixture.detectChanges();
    const loadingElement =
      fixture.nativeElement.querySelector('.loading-container');
    expect(loadingElement).toBeTruthy();
  });

  it('should display the failure template if convertResponse success is false', () => {
    const convertResponse = {
      success: false,
      query: {
        amount: 100,
        to: 'USD',
        from: 'EUR',
      },
      info: {
        rate: 1,
        timestamp: 1,
      },
      historical: true,
      date: '',
      result: 1,
    };
    component.convertResponse$ = of(convertResponse);
    fixture.detectChanges();
    const failureElement =
      fixture.nativeElement.querySelector('.error-container');
    expect(failureElement).toBeTruthy();
  });
});
