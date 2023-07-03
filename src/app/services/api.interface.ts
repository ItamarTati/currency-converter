export interface Symbols {
  symbols: { [currencyCode: string]: string };
  success: boolean;
}

export interface ExchangeRatesResponse {
  base: string;
  date: string;
  rates: {
    [currencyCode: string]: number;
  };
}

export interface ConvertResponse {
  success: boolean;
  query: {
    from: string;
    to: string;
    amount: number;
  };
  info: {
    rate: number;
    timestamp: number;
  };
  historical: boolean;
  date: string;
  result: number;
}

export interface ExchangeRateHistoryResponse {
  timeseries: boolean;
  start_date: string;
  end_date: string;
  base: string;
  rates: {
    [date: string]: {
      [currencyCode: string]: number;
    };
  };
}

export interface ExchangeRateFluctuationResponse {
  fluctuation: boolean;
  start_date: string;
  end_date: string;
  base: string;
  rates: {
    [currencyCode: string]: {
      start_rate: number;
      end_rate: number;
      change: number;
    };
  };
}

export interface FormSubmit {
  date: Date;
  symbols: string[];
  from: string;
  to: string;
  amount: number;
}
