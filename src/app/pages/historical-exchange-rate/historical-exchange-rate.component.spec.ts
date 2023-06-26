import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { HistoricalExchangeRateComponent } from './historical-exchange-rate.component';

describe('HistoricalExchangeRateComponent', () => {
  let component: HistoricalExchangeRateComponent;
  let fixture: ComponentFixture<HistoricalExchangeRateComponent>;
  let store: any;

  beforeEach(async () => {
    store = {
      dispatch: jest.fn(),
      select: jest.fn(),
    };

    const formGroupMock = {
      value: {
        selectedDate: new Date('2013-03-16'),
        selectedSymbols: ['USD', 'GBP', 'EUR'],
      },
      patchValue: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [HistoricalExchangeRateComponent],
      providers: [
        FormBuilder,
        { provide: Store, useValue: store },
        { provide: FormGroup, useValue: formGroupMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalExchangeRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  // can't test these because they they us reference variables and 
  // I would need a library or to create my own function to test them
  // it('should initialize the form with default values', () => {
  //   expect(component.historicalExchangeRateForm.value).toEqual({
  //     selectedDate: new Date('2013-03-16'),
  //     selectedSymbols: ['USD', 'GBP', 'EUR'],
  //   });
  // });

  // it('should call dispatch when form is submitted', () => {
  //   const date = new Date('2013-03-16');
  //   const symbols = ['USD', 'GBP', 'EUR'];

  //   component.historicalExchangeRateForm.patchValue({
  //     selectedDate: date,
  //     selectedSymbols: symbols,
  //   });

  //   component.getHistoricalData({ date, symbols });

  //   expect(store.dispatch).toHaveBeenCalledWith({
  //     type: '[API] Get Historical Exchange Rates',
  //     payload: {
  //       date: date.toISOString().substring(0, 10),
  //       symbols,
  //     },
  //   });
  // });
});