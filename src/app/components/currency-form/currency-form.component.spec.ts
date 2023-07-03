import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { CurrencyFormComponent } from './currency-form.component';

describe('CurrencyFormComponent', () => {
  let component: CurrencyFormComponent;
  let fixture: ComponentFixture<CurrencyFormComponent>;
  let mockStore: any;

  beforeEach(async () => {
    mockStore = {
      select: jest.fn(() => of({ symbols: { USD: 'US Dollar', EUR: 'Euro' } })),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CurrencyFormComponent],
      providers: [FormBuilder, { provide: Store, useValue: mockStore }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyFormComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getTheLatestExchangeRate', () => {
    beforeEach(() => {
      component.form = TestBed.inject(FormBuilder).group({
        selectedSymbols: [[], Validators.required],
        sourceCurrency: null,
        amount: null,
        destinationCurrency: null,
      });
    });

    it('should emit formSubmit event when form is valid', () => {
      const emitSpy = jest.spyOn(component.formSubmit, 'emit');
      component.form.setValue({
        selectedSymbols: ['USD'],
        sourceCurrency: 'USD',
        amount: 100,
        destinationCurrency: 'EUR',
      });
      component.submitForm();
      expect(emitSpy).toHaveBeenCalledWith({
        symbols: ['USD'],
        from: 'USD',
        amount: 100,
        to: 'EUR',
      });
    });

    it('should not emit formSubmit event when form is invalid', () => {
      const emitSpy = jest.spyOn(component.formSubmit, 'emit');
      component.submitForm();
      expect(emitSpy).not.toHaveBeenCalled();
    });
  });

  describe('getHistoricalExchangeRate', () => {
    beforeEach(() => {
      component.form = TestBed.inject(FormBuilder).group({
        selectedSymbols: [],
        selectedDate: null,
      });
    });

    it('should emit formSubmit event when form is valid and selectedDate is in the past', () => {
      const emitSpy = jest.spyOn(component.formSubmit, 'emit');
      component.form.setValue({
        selectedSymbols: ['USD'],
        selectedDate: new Date('2023-07-01'),
      });
      component.submitForm();
      expect(emitSpy).toHaveBeenCalledWith({
        symbols: ['USD'],
        date: new Date('2023-07-01'),
      });
    });

    // Testing dates is very hard, I wouldn't test like this in a real production app,
    //because it will fail when you get pass that date
    it('should not emit formSubmit event when selectedDate is in the future', () => {
      const emitSpy = jest.spyOn(component.formSubmit, 'emit');
      component.form.setValue({
        selectedSymbols: ['USD'],
        selectedDate: new Date('2026-07-10'),
      });
      component.submitForm();
      expect(emitSpy).not.toHaveBeenCalled();
    });
  });

  describe('convertCurrency', () => {
    beforeEach(() => {
      component.form = TestBed.inject(FormBuilder).group({
        sourceCurrency: [null, [Validators.required]],
        amount: [null, [Validators.required]],
        destinationCurrency: [null, [Validators.required]],
      });
    });

    it('should emit formSubmit event when form is valid', () => {
      const emitSpy = jest.spyOn(component.formSubmit, 'emit');
      component.form.setValue({
        sourceCurrency: 'USD',
        amount: 100,
        destinationCurrency: 'EUR',
      });
      component.submitForm();
      expect(emitSpy).toHaveBeenCalledWith({
        from: 'USD',
        amount: 100,
        to: 'EUR',
        date: undefined,
        symbols: [],
      });
    });

    it('should not emit formSubmit event when form is invalid', () => {
      const emitSpy = jest.spyOn(component.formSubmit, 'emit');
      component.submitForm();
      expect(emitSpy).not.toHaveBeenCalled();
    });
  });
});
