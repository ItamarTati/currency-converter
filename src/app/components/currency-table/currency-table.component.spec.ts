import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { CurrencyTableComponent } from './currency-table.component';

describe('CurrencyTableComponent', () => {
  let component: CurrencyTableComponent;
  let fixture: ComponentFixture<CurrencyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [CurrencyTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set dataSource.data when exchangeRates is provided', () => {
    const exchangeRates = {
      rates: {
        USD: 1.23,
        EUR: 1,
        GBP: 0.89,
      },
      base: 'EUR',
      date: '2022-01-01',
    };

    component.exchangeRates = exchangeRates;
    component.ngOnChanges();

    expect(component.dataSource.data).toEqual([
      { currency: 'USD', rate: 1.23 },
      { currency: 'EUR', rate: 1 },
      { currency: 'GBP', rate: 0.89 },
    ]);
  });

  it('should not set dataSource.data when exchangeRates is null', () => {
    component.exchangeRates = null;
    component.ngOnChanges();

    expect(component.dataSource.data).toEqual([]);
  });
});