import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeRateFluctuatuationComponent } from './exchange-rate-fluctuatuation.component';

describe('ExchangeRateFluctuatuationComponent', () => {
  let component: ExchangeRateFluctuatuationComponent;
  let fixture: ComponentFixture<ExchangeRateFluctuatuationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExchangeRateFluctuatuationComponent]
    });
    fixture = TestBed.createComponent(ExchangeRateFluctuatuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
