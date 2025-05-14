export interface SymbolSearchResult {
  symbol: string
  name: string
  currency: string
  exchange: string
  mic_code: string
  country: string
  type: string
}
export interface StockSymbol {
  symbol: string
  name: string
  currency: string
  exchange: string
  mic_code: string
  country: string
  type: string
  figi_code?: string
  cfi_code?: string
  isin?: string
}

export interface StockQuote {
  symbol: string
  name: string
  exchange: string
  mic_code: string
  currency: string
  datetime: string
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
  previous_close: number
  change: number
  percent_change: number
  is_market_open: boolean
}

export interface Stock {
  symbol: string
  name: string
  exchange: string
  currentPrice: number
  previousClose: number
  openPrice: number
  priceChange: number
  percentChange: number
  isGrowing: boolean
}

export interface CandleData {
  meta: {
    symbol: string
    interval: string
    currency: string
    exchange_timezone: string
    exchange: string
    mic_code: string
    type: string
  }
  values: {
    datetime: string
    open: number
    high: number
    low: number
    close: number
    volume: number
  }[]
  status: string
}

export interface RSIData {
  meta: {
    symbol: string
    interval: string
    indicator: {
      name: string
      series_type: string
      time_period: number
    }
  }
  values: {
    datetime: string
    rsi: number
  }[]
  status: string
}

export interface MACDData {
  meta: {
    symbol: string
    interval: string
    indicator: {
      name: string
      fast_period: number
      series_type: string
      signal_period: number
      slow_period: number
    }
  }
  values: {
    datetime: string
    macd: number
    macd_signal: number
    macd_hist: number
  }[]
  status: string
}

export interface ChartDataPoint {
  datetime: string
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
  rsi?: number
  macd?: number
  macd_signal?: number
  macd_hist?: number
}

export enum StockFilter {
  ALL = 'all',
  GROWING = 'growing',
  FALLING = 'falling',
}
