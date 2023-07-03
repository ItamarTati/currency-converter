import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import {
  ExchangeRatesResponse,
  ConvertResponse,
  ExchangeRateHistoryResponse,
  ExchangeRateFluctuationResponse,
  Symbols,
} from './api.interface';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const symbols = ['USD', 'AUD', 'CAD', 'PLN', 'MXN'];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve symbols', () => {
    const mockResponse: Symbols = {
      symbols: {
        USD: 'United States Dollar',
        EUR: 'Euro',
        GBP: 'British Pound',
      },
      success: true,
    };
    service.getSymbols().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const request = httpMock.expectOne((request) => {
      return (
        request.url ===
          `${service['getApiUrl']()}/symbols?access_key=${service[
            'getAccessKey'
          ]()}` && request.method === 'GET'
      );
    });
    request.flush(mockResponse);
  });

  it('should retrieve the latest exchange rates', () => {
    const mockResponse: ExchangeRatesResponse = {
      base: 'EUR',
      date: '2023-06-25',
      rates: {
        USD: 1.09313,
        AUD: 1.636913,
        CAD: 1.444408,
        PLN: 4.453097,
        MXN: 18.761289,
      },
    };

    service.getLatestExchangeRates(symbols).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const request = httpMock.expectOne(
      `${service['getApiUrl']()}/latest?access_key=${service[
        'getAccessKey'
      ]()}&symbols=USD,AUD,CAD,PLN,MXN`
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockResponse);
  });

  it('should retrieve historical exchange rates for a specific date', () => {
    const date = '2013-03-16';
    const mockResponse: ExchangeRatesResponse = {
      base: 'EUR',
      date: '2013-03-16',
      rates: {
        USD: 1.307716,
        AUD: 1.256333,
        CAD: 1.333812,
        PLN: 4.150819,
        MXN: 16.259128,
      },
    };

    service.getHistoricalExchangeRates(date, symbols).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const request = httpMock.expectOne(
      `${service['getApiUrl']()}/${date}?access_key=${service[
        'getAccessKey'
      ]()}&symbols=USD,AUD,CAD,PLN,MXN`
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockResponse);
  });

  it('should convert currency', () => {
    const from = 'USD';
    const to = 'EUR';
    const amount = 25;
    const mockResponse: ConvertResponse = {
      success: true,
      query: {
        from,
        to,
        amount,
      },
      info: {
        rate: 0.88212,
        timestamp: 1687676943,
      },
      historical: false,
      date: '2023-06-25',
      result: 22.053,
    };

    service.convertCurrency(from, to, amount).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const request = httpMock.expectOne(
      `${service['getApiUrl']()}/convert?access_key=${service[
        'getAccessKey'
      ]()}&from=${from}&to=${to}&amount=${amount}`
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockResponse);
  });

  it('should retrieve exchange rate history within a date range', () => {
    const startDate = '2023-06-20';
    const endDate = '2023-06-25';
    const mockResponse: ExchangeRateHistoryResponse = {
      timeseries: true,
      start_date: startDate,
      end_date: endDate,
      base: 'EUR',
      rates: {
        '2023-06-20': {
          USD: 1.090102,
          AUD: 1.631073,
          CAD: 1.437309,
          PLN: 4.434378,
          MXN: 18.712389,
        },
        '2023-06-21': {
          USD: 1.093204,
          AUD: 1.636774,
          CAD: 1.444367,
          PLN: 4.451277,
          MXN: 18.743483,
        },
        '2023-06-22': {
          USD: 1.091248,
          AUD: 1.632457,
          CAD: 1.438755,
          PLN: 4.437264,
          MXN: 18.724743,
        },
        '2023-06-23': {
          USD: 1.092314,
          AUD: 1.634792,
          CAD: 1.441015,
          PLN: 4.442815,
          MXN: 18.740192,
        },
        '2023-06-24': {
          USD: 1.093238,
          AUD: 1.636761,
          CAD: 1.443696,
          PLN: 4.450583,
          MXN: 18.753879,
        },
        '2023-06-25': {
          USD: 1.09313,
          AUD: 1.636913,
          CAD: 1.444408,
          PLN: 4.453097,
          MXN: 18.761289,
        },
      },
    };

    service
      .getExchangeRateHistory(startDate, endDate, symbols)
      .subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

    const request = httpMock.expectOne(
      `${service['getApiUrl']()}/timeseries?access_key=${service[
        'getAccessKey'
      ]()}&start_date=${startDate}&end_date=${endDate}&symbols=USD,AUD,CAD,PLN,MXN`
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockResponse);
  });

  it('should retrieve exchange rate fluctuations within a date range', () => {
    const startDate = '2023-06-20';
    const endDate = '2023-06-25';
    const mockResponse: ExchangeRateFluctuationResponse = {
      fluctuation: true,
      start_date: startDate,
      end_date: endDate,
      base: 'EUR',
      rates: {
        USD: {
          start_rate: 1.090102,
          end_rate: 1.09313,
          change: 0.002998,
        },
        AUD: {
          start_rate: 1.631073,
          end_rate: 1.636913,
          change: 0.00584,
        },
        CAD: {
          start_rate: 1.437309,
          end_rate: 1.444408,
          change: 0.007099,
        },
        PLN: {
          start_rate: 4.434378,
          end_rate: 4.453097,
          change: 0.018719,
        },
        MXN: {
          start_rate: 18.712389,
          end_rate: 18.761289,
          change: 0.0489,
        },
      },
    };

    service
      .getExchangeRateFluctuation(startDate, endDate, symbols)
      .subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

    const request = httpMock.expectOne(
      `${service['getApiUrl']()}/fluctuation?access_key=${service[
        'getAccessKey'
      ]()}&symbols=USD,AUD,CAD,PLN,MXN&start_date=${startDate}&end_date=${endDate}`
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockResponse);
  });
});
