export interface SymbolLookupResult {
  count: number
  result: SymbolSearchResult[]
}

export interface SymbolSearchResult {
  description: string
  displaySymbol: string
  symbol: string
  type: string
}

export interface StockSymbol {
  currency: string
  description: string
  displaySymbol: string
  figi: string
  mic: string
  symbol: string
  type: string
}

export interface MarketStatus {
  exchange: string
  holiday: string | null
  isOpen: boolean
  session: string
  timezone: string
  t: number
}

export interface StockQuote {
  c: number // Current price
  d: number // Change
  dp: number // Percent change
  h: number // High price of the day
  l: number // Low price of the day
  o: number // Open price of the day
  pc: number // Previous close price
  t: number // Timestamp
}

export interface Stock {
  symbol: string
  description: string
  currentPrice: number
  previousClose: number
  openPrice: number
  priceChange: number
  percentChange: number
  isGrowing: boolean
}

export interface CandleData {
  c: number[] // Close prices
  h: number[] // High prices
  l: number[] // Low prices
  o: number[] // Open prices
  s: string // Status
  t: number[] // Timestamps
  v: number[] // Volumes
}

export interface ChartDataPoint {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export enum StockFilter {
  ALL = 'all',
  GROWING = 'growing',
  FALLING = 'falling',
}
