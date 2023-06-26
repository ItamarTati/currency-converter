import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeRateHistoryComponent } from './exchange-rate-history.component';

describe('ExchangeRateHistoryComponent', () => {
  let component: ExchangeRateHistoryComponent;
  let fixture: ComponentFixture<ExchangeRateHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExchangeRateHistoryComponent]
    });
    fixture = TestBed.createComponent(ExchangeRateHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
