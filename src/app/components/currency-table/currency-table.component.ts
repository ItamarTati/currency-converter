import { Component, Input, OnInit } from '@angular/core';
import { ExchangeRatesResponse } from '../../services/api.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-currency-table',
  templateUrl: './currency-table.component.html',
  styleUrls: ['./currency-table.component.scss']
})
export class CurrencyTableComponent {
  @Input() exchangeRates: ExchangeRatesResponse | null = null;
  public columnsToDisplay: string[] = ['currency', 'rate'];
  public dataSource: MatTableDataSource<{ currency: string; rate: number }>;

  constructor() {
    this.dataSource = new MatTableDataSource<{ currency: string; rate: number }>([]);
  }


  ngOnChanges(): void {
    if (this.exchangeRates) {
      const ratesArray = Object.entries(this.exchangeRates.rates).map(([currency, rate]) => ({ currency, rate }));
      this.dataSource.data = ratesArray;
    }
  }
}