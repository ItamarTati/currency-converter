import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeReducer } from './store/store.reducer'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyFormComponent } from './components/currency-form/currency-form.component';
import { CurrencyTableComponent } from './components/currency-table/currency-table.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreEffects } from './store/store.effects';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LatestExchangeRateComponent } from './pages/latest-exchange-rate/latest-exchange-rate.component';
import { HistoricalExchangeRateComponent } from './pages/historical-exchange-rate/historical-exchange-rate.component';
import { ExchangeRateHistoryComponent } from './pages/exchange-rate-history/exchange-rate-history.component';
import { ExchangeRateFluctuatuationComponent } from './pages/exchange-rate-fluctuatuation/exchange-rate-fluctuatuation.component';
import { ConvertCurrencyComponent } from './pages/convert-currency/convert-currency.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    CurrencyFormComponent,
    CurrencyTableComponent,
    NavBarComponent,
    LatestExchangeRateComponent,
    HistoricalExchangeRateComponent,
    ExchangeRateHistoryComponent,
    ExchangeRateFluctuatuationComponent,
    ConvertCurrencyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('store', storeReducer),
    EffectsModule.forRoot([StoreEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
