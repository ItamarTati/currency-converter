import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CurrencyFormComponent } from './currency-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('CurrencyFormComponent', () => {
  let component: CurrencyFormComponent;
  let fixture: ComponentFixture<CurrencyFormComponent>;
  let mockStore: Partial<Store>;

  beforeEach(async () => {
    mockStore = {
      select: jest.fn().mockReturnValue(of({ symbols: { USD: 'US Dollar', EUR: 'Euro', GBP: 'British Pound' } }))
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatFormFieldModule,
        BrowserAnimationsModule
      ],
      declarations: [CurrencyFormComponent],
      providers: [
        FormBuilder,
        { provide: Store, useValue: mockStore }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyFormComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      selectedCurrency: new FormControl(),
      selectedDate: new FormControl(),
      selectedSymbols: new FormControl()
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit formSubmit event when form is valid', () => {
    const emitSpy = jest.spyOn(component.formSubmit, 'emit');
    const date = new Date('2013-03-16');
    component.form.controls['selectedSymbols'].setValue(['USD']);
    component.form.controls['selectedDate'].setValue(date);
    expect(component.form.valid).toBe(true);
    component.submitForm();
    expect(emitSpy).toHaveBeenCalledWith({
      date: date,
      symbols: ['USD'],
    });
  });

  it('should not emit formSubmit event when form is invalid', () => {
    const emitSpy = jest.spyOn(component.formSubmit, 'emit');
    component.form.controls['selectedSymbols'].setValue(null);
    component.submitForm();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should return true if a symbol is selected', () => {
    component.form.controls['selectedSymbols'].setValue(['USD', 'EUR']);
    expect(component.isSymbolSelected('USD')).toBe(true);
    expect(component.isSymbolSelected('GBP')).toBe(false);
  });
});