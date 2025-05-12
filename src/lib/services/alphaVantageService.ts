import {StockQuote, StockSymbol, CandleData} from '../types/stock'
import {
  fetchStockQuote as fetchMockStockQuote,
  getStockSymbols as getMockStockSymbols,
  fetchHistoricalData as fetchMockHistoricalData,
} from './mockStockService'

const ALPHA_VANTAGE_API_KEY =
  process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY || ''
const ALPHA_VANTAGE_API_URL = 'https://www.alphavantage.co/query'
const USE_MOCKS =
  process.env.NEXT_PUBLIC_USE_MOCKS === 'true' ||
  process.env.NODE_ENV === 'development'

export async function fetchStockQuote(
  symbol: string
): Promise<StockQuote> {
  try {
    if (USE_MOCKS) {
      return await fetchMockStockQuote(symbol)
    }
    const response = await fetch(
      `${ALPHA_VANTAGE_API_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apiKey=${ALPHA_VANTAGE_API_KEY}`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch stock data')
    }
    const data = await response.json()
    if (!data || !data['Global Quote']) {
      throw new Error('Invalid API response format')
    }
    const quote = data['Global Quote']
    return {
      c: parseFloat(quote['05. price'] || 0),
      d: parseFloat(quote['09. change'] || 0),
      dp: parseFloat(
        quote['10. change percent'].replace('%', '') || 0
      ),
      h: parseFloat(quote['03. high'] || 0),
      l: parseFloat(quote['04. low'] || 0),
      o: parseFloat(quote['02. open'] || 0),
      pc: parseFloat(quote['08. previous close'] || 0),
      t: Date.now(),
    }
  } catch (error) {
    console.error(`Error fetching quote for ${symbol}:`, error)
    return await fetchMockStockQuote(symbol)
  }
}

export async function getStockSymbols(): Promise<StockSymbol[]> {
  try {
    if (USE_MOCKS) {
      return await getMockStockSymbols()
    }
    const popularStocks = [
      {symbol: 'AAPL', description: 'Apple Inc.'},
      {symbol: 'MSFT', description: 'Microsoft Corporation'},
      {symbol: 'GOOGL', description: 'Alphabet Inc.'},
      {symbol: 'AMZN', description: 'Amazon.com Inc.'},
      {symbol: 'META', description: 'Meta Platforms, Inc.'},
      {symbol: 'TSLA', description: 'Tesla, Inc.'},
      {symbol: 'NVDA', description: 'NVIDIA Corporation'},
      {symbol: 'JPM', description: 'JPMorgan Chase & Co.'},
    ]
    return popularStocks.map((stock) => ({
      currency: 'USD',
      description: stock.description,
      displaySymbol: stock.symbol,
      figi: '',
      mic: '',
      symbol: stock.symbol,
      type: 'Common Stock',
    }))
  } catch (error) {
    console.error('Error fetching stock symbols:', error)
    return await getMockStockSymbols()
  }
}

export async function fetchHistoricalData(
  symbol: string
): Promise<CandleData> {
  try {
    if (USE_MOCKS) {
      return await fetchMockHistoricalData(symbol)
    }
    const response = await fetch(
      `${ALPHA_VANTAGE_API_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apiKey=${ALPHA_VANTAGE_API_KEY}`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch historical data')
    }
    const data = await response.json()
    if (!data || !data['Time Series (Daily)']) {
      throw new Error('Invalid API response format')
    }
    const timeSeries = data['Time Series (Daily)']
    const dates = Object.keys(timeSeries).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    )
    const c: number[] = []
    const h: number[] = []
    const l: number[] = []
    const o: number[] = []
    const t: number[] = []
    const v: number[] = []
    dates.forEach((date) => {
      const dayData = timeSeries[date]
      const timestamp = Math.floor(new Date(date).getTime() / 1000)
      t.push(timestamp)
      o.push(parseFloat(dayData['1. open']))
      h.push(parseFloat(dayData['2. high']))
      l.push(parseFloat(dayData['3. low']))
      c.push(parseFloat(dayData['4. close']))
      v.push(parseFloat(dayData['5. volume']))
    })
    return {c, h, l, o, t, v, s: 'ok'}
  } catch (error) {
    console.error(
      `Error fetching historical data for ${symbol}:`,
      error
    )
    return await fetchMockHistoricalData(symbol)
  }
}

export async function searchStocks(
  keywords: string
): Promise<StockSymbol[]> {
  try {
    if (USE_MOCKS) {
      return await import('./mockStockService').then((module) =>
        module.searchStocks(keywords)
      )
    }
    const response = await fetch(
      `${ALPHA_VANTAGE_API_URL}?function=SYMBOL_SEARCH&keywords=${keywords}&apiKey=${ALPHA_VANTAGE_API_KEY}`
    )
    if (!response.ok) {
      throw new Error('Failed to search stocks')
    }
    const data = await response.json()
    if (!data || !data.bestMatches) {
      return []
    }
    return data.bestMatches.map((match: any) => ({
      currency: match['8. currency'] || 'USD',
      description: match['2. name'] || '',
      displaySymbol: match['1. symbol'] || '',
      figi: '',
      mic: match['4. region'] || '',
      symbol: match['1. symbol'] || '',
      type: match['3. type'] || 'Common Stock',
    }))
  } catch (error) {
    console.error('Error searching stocks:', error)
    return await import('./mockStockService').then((module) =>
      module.searchStocks(keywords)
    )
  }
}
