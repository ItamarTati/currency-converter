import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LatestExchangeRateComponent } from './pages/latest-exchange-rate/latest-exchange-rate.component';
import { HistoricalExchangeRateComponent } from './pages/historical-exchange-rate/historical-exchange-rate.component';
import { ConvertCurrencyComponent } from './pages/convert-currency/convert-currency.component';
import { ExchangeRateHistoryComponent } from './pages/exchange-rate-history/exchange-rate-history.component';
import { ExchangeRateFluctuatuationComponent } from './pages/exchange-rate-fluctuatuation/exchange-rate-fluctuatuation.component';

const routes: Routes = [
  { path: 'latest', component: LatestExchangeRateComponent },
  { path: 'historical', component: HistoricalExchangeRateComponent },
  { path: 'convert', component: ConvertCurrencyComponent },
  { path: 'history', component: ExchangeRateHistoryComponent },
  { path: 'fluctuation', component: ExchangeRateFluctuatuationComponent },
  { path: '', redirectTo: '/latest', pathMatch: 'full' },
  { path: '**', redirectTo: '/latest' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }