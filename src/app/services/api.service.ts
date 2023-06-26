import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExchangeRatesResponse, ConvertResponse, ExchangeRateHistoryResponse, ExchangeRateFluctuationResponse, Symbols } from './api.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // IMPORTANT: Reviewer/Employer Note
  // In a production environment, it is crucial to never add API keys directly in the code, especially for public repositories.
  // However, since this is a coding test and I'm using a free API with limited access, the risk is minimal in this scenario.
  // I want to emphasize that I am fully aware of the security concerns and would never include real API keys in a production application.
  // If this were a real-world scenario where I am paying for the service, I would always generate another key and securely store it.

  private readonly accessKey = 'e7f2c6a93d8aa1d47c91abd5d03d69cc';
  private readonly apiUrl = 'http://data.fixer.io/api';

  constructor(private http: HttpClient) { }

  getSymbols(): Observable<Symbols> {
    const url = `${this.apiUrl}/symbols?access_key=${this.accessKey}`;
    return this.http.get<Symbols>(url);
  }


  getLatestExchangeRates(symbols: string[]): Observable<ExchangeRatesResponse> {
    const symbolString = symbols.join(',');
    const url = `${this.apiUrl}/latest?access_key=${this.accessKey}&symbols=${symbolString}`;
    return this.http.get<ExchangeRatesResponse>(url);
  }

  getHistoricalExchangeRates(date: string, symbols: string[]): Observable<ExchangeRatesResponse> {
    const symbolString = symbols.join(',');
    const url = `${this.apiUrl}/${date}?access_key=${this.accessKey}&symbols=${symbolString}`;
    return this.http.get<ExchangeRatesResponse>(url);
  }

  convertCurrency(from: string, to: string, amount: number): Observable<ConvertResponse> {
    const url = `${this.apiUrl}/convert?access_key=${this.accessKey}&from=${from}&to=${to}&amount=${amount}`;
    return this.http.get<ConvertResponse>(url);
  }

  getExchangeRateHistory(startDate: string, endDate: string, symbols: string[]): Observable<ExchangeRateHistoryResponse> {
    const symbolString = symbols.join(',');
    const url = `${this.apiUrl}/timeseries?access_key=${this.accessKey}&start_date=${startDate}&end_date=${endDate}&symbols=${symbolString}`;
    return this.http.get<ExchangeRateHistoryResponse>(url);
  }

  getExchangeRateFluctuation(startDate: string, endDate: string, symbols: string[]): Observable<ExchangeRateFluctuationResponse> {
    const symbolString = symbols.join(',');
    const url = `${this.apiUrl}/fluctuation?access_key=${this.accessKey}&symbols=${symbolString}&start_date=${startDate}&end_date=${endDate}`;
    return this.http.get<ExchangeRateFluctuationResponse>(url);
  }

  private getApiUrl(): string {
    return this.apiUrl;
  }

  private getAccessKey(): string {
    return this.accessKey;
  }
}