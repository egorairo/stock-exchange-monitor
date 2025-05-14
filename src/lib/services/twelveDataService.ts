import {
  StockQuote,
  StockSymbol,
  CandleData,
  RSIData,
  MACDData,
} from '../types/stock'
import {
  fetchStockQuoteMock,
  getStockSymbolsMock,
  fetchHistoricalDataMock,
  fetchRSIMock,
  fetchMACDMock,
  searchStocksMock,
} from './mockStockService'

const TWELVE_DATA_API_KEY =
  process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY || ''
const TWELVE_DATA_BASE_URL = 'https://api.twelvedata.com'

const USE_MOCKS =
  process.env.NEXT_PUBLIC_USE_MOCKS === 'true' ||
  process.env.NODE_ENV === 'development'

export async function fetchStockQuote(
  symbol: string
): Promise<StockQuote> {
  try {
    if (USE_MOCKS) {
      return await fetchStockQuoteMock(symbol)
    }

    const response = await fetch(
      `${TWELVE_DATA_BASE_URL}/quote?symbol=${symbol}&apikey=${TWELVE_DATA_API_KEY}`
    )

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()

    return {
      symbol: data.symbol,
      name: data.name,
      exchange: data.exchange,
      mic_code: data.mic_code,
      currency: data.currency,
      datetime: data.datetime,
      timestamp: parseInt(data.timestamp, 10),
      open: parseFloat(data.open),
      high: parseFloat(data.high),
      low: parseFloat(data.low),
      close: parseFloat(data.close),
      volume: parseInt(data.volume, 10),
      previous_close: parseFloat(data.previous_close),
      change: parseFloat(data.change),
      percent_change: parseFloat(data.percent_change),
      is_market_open: data.is_market_open,
    }
  } catch (error) {
    console.error(`Error fetching quote for ${symbol}:`, error)

    return await fetchStockQuoteMock(symbol)
  }
}

export async function getStockSymbols(): Promise<StockSymbol[]> {
  try {
    if (USE_MOCKS) {
      return await getStockSymbolsMock()
    }

    const response = await fetch(
      `${TWELVE_DATA_BASE_URL}/stocks?exchange=NASDAQ&apikey=${TWELVE_DATA_API_KEY}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch stock symbols')
    }

    const data = await response.json()

    return data.data.slice(0, 200)
  } catch (error) {
    console.error('Error fetching stock symbols:', error)

    return await getStockSymbolsMock()
  }
}

export async function fetchHistoricalData(
  symbol: string,
  interval: string = '1month'
): Promise<CandleData> {
  try {
    if (USE_MOCKS) {
      return await fetchHistoricalDataMock(symbol)
    }

    const response = await fetch(
      `${TWELVE_DATA_BASE_URL}/time_series?symbol=${symbol}&interval=${interval}&apikey=${TWELVE_DATA_API_KEY}`
    )

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.values && Array.isArray(data.values)) {
      data.values = data.values.map((item) => ({
        datetime: item.datetime,
        open: parseFloat(item.open),
        high: parseFloat(item.high),
        low: parseFloat(item.low),
        close: parseFloat(item.close),
        volume: parseInt(item.volume, 10),
      }))
    }

    return data
  } catch (error) {
    console.error(
      `Error fetching historical data for ${symbol}:`,
      error
    )

    return await fetchHistoricalDataMock(symbol)
  }
}

export async function fetchRSI(
  symbol: string,
  interval: string = '1month'
): Promise<RSIData> {
  try {
    if (USE_MOCKS) {
      return await fetchRSIMock(symbol)
    }

    const response = await fetch(
      `${TWELVE_DATA_BASE_URL}/rsi?symbol=${symbol}&interval=${interval}&apikey=${TWELVE_DATA_API_KEY}`
    )

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.values && Array.isArray(data.values)) {
      data.values = data.values.map((item) => ({
        datetime: item.datetime,
        rsi: parseFloat(item.rsi),
      }))
    }

    return data
  } catch (error) {
    console.error(`Error fetching RSI for ${symbol}:`, error)

    return await fetchRSIMock(symbol)
  }
}

export async function fetchMACD(
  symbol: string,
  interval: string = '1month'
): Promise<MACDData> {
  try {
    if (USE_MOCKS) {
      return await fetchMACDMock(symbol)
    }

    const response = await fetch(
      `${TWELVE_DATA_BASE_URL}/macd?symbol=${symbol}&interval=${interval}&apikey=${TWELVE_DATA_API_KEY}`
    )

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.values && Array.isArray(data.values)) {
      data.values = data.values.map((item) => ({
        datetime: item.datetime,
        macd: parseFloat(item.macd),
        macd_signal: parseFloat(item.macd_signal),
        macd_hist: parseFloat(item.macd_hist),
      }))
    }

    return data
  } catch (error) {
    console.error(`Error fetching MACD for ${symbol}:`, error)

    return await fetchMACDMock(symbol)
  }
}

export async function searchStocks(
  keywords: string
): Promise<StockSymbol[]> {
  try {
    if (USE_MOCKS) {
      return await searchStocksMock(keywords)
    }

    const symbols = await getStockSymbols()
    const lowerQuery = keywords.toLowerCase()

    return symbols.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(lowerQuery) ||
        stock.name.toLowerCase().includes(lowerQuery)
    )
  } catch (error) {
    console.error('Error searching stocks:', error)

    return await searchStocksMock(keywords)
  }
}
