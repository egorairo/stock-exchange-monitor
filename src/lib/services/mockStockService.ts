import {
  StockQuote,
  StockSymbol,
  CandleData,
  RSIData,
  MACDData,
} from '../types/stock'

const MOCK_STOCKS: StockSymbol[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    exchange: 'NASDAQ',
    currency: 'USD',
    mic_code: 'XNGS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    exchange: 'NASDAQ',
    currency: 'USD',
    mic_code: 'XNGS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    exchange: 'NASDAQ',
    currency: 'USD',
    mic_code: 'XNGS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    exchange: 'NASDAQ',
    currency: 'USD',
    mic_code: 'XNGS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'META',
    name: 'Meta Platforms, Inc.',
    exchange: 'NASDAQ',
    currency: 'USD',
    mic_code: 'XNGS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    exchange: 'NASDAQ',
    currency: 'USD',
    mic_code: 'XNGS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    exchange: 'NASDAQ',
    currency: 'USD',
    mic_code: 'XNGS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    exchange: 'NYSE',
    currency: 'USD',
    mic_code: 'XNYS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'BAC',
    name: 'Bank of America Corporation',
    exchange: 'NYSE',
    currency: 'USD',
    mic_code: 'XNYS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'WMT',
    name: 'Walmart Inc.',
    exchange: 'NYSE',
    currency: 'USD',
    mic_code: 'XNYS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'PG',
    name: 'Procter & Gamble Co.',
    exchange: 'NYSE',
    currency: 'USD',
    mic_code: 'XNYS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'DIS',
    name: 'Walt Disney Co.',
    exchange: 'NYSE',
    currency: 'USD',
    mic_code: 'XNYS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'NFLX',
    name: 'Netflix, Inc.',
    exchange: 'NASDAQ',
    currency: 'USD',
    mic_code: 'XNGS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'XOM',
    name: 'Exxon Mobil Corporation',
    exchange: 'NYSE',
    currency: 'USD',
    mic_code: 'XNYS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'JNJ',
    name: 'Johnson & Johnson',
    exchange: 'NYSE',
    currency: 'USD',
    mic_code: 'XNYS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    exchange: 'NASDAQ',
    currency: 'USD',
    mic_code: 'XNGS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    exchange: 'NASDAQ',
    currency: 'USD',
    mic_code: 'XNGS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    exchange: 'NYSE',
    currency: 'USD',
    mic_code: 'XNYS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'BAC',
    name: 'Bank of America Corporation',
    exchange: 'NYSE',
    currency: 'USD',
    mic_code: 'XNYS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'WMT',
    name: 'Walmart Inc.',
    exchange: 'NYSE',
    currency: 'USD',
    mic_code: 'XNYS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'PG',
    name: 'Procter & Gamble Co.',
    exchange: 'NYSE',
    currency: 'USD',
    mic_code: 'XNYS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'DIS',
    name: 'Walt Disney Co.',
    exchange: 'NYSE',
    currency: 'USD',
    mic_code: 'XNYS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'NFLX',
    name: 'Netflix, Inc.',
    exchange: 'NASDAQ',
    currency: 'USD',
    mic_code: 'XNGS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'XOM',
    name: 'Exxon Mobil Corporation',
    exchange: 'NYSE',
    currency: 'USD',
    mic_code: 'XNYS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'JNJ',
    name: 'Johnson & Johnson',
    exchange: 'NYSE',
    currency: 'USD',
    mic_code: 'XNYS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    exchange: 'NASDAQ',
    currency: 'USD',
    mic_code: 'XNGS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    exchange: 'NASDAQ',
    currency: 'USD',
    mic_code: 'XNGS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    exchange: 'NYSE',
    currency: 'USD',
    mic_code: 'XNYS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'BAC',
    name: 'Bank of America Corporation',
    exchange: 'NYSE',
    currency: 'USD',
    mic_code: 'XNYS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'WMT',
    name: 'Walmart Inc.',
    exchange: 'NYSE',
    currency: 'USD',
    mic_code: 'XNYS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'PG',
    name: 'Procter & Gamble Co.',
    exchange: 'NYSE',
    currency: 'USD',
    mic_code: 'XNYS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'DIS',
    name: 'Walt Disney Co.',
    exchange: 'NYSE',
    currency: 'USD',
    mic_code: 'XNYS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'NFLX',
    name: 'Netflix, Inc.',
    exchange: 'NASDAQ',
    currency: 'USD',
    mic_code: 'XNGS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'XOM',
    name: 'Exxon Mobil Corporation',
    exchange: 'NYSE',
    currency: 'USD',
    mic_code: 'XNYS',
    country: 'United States',
    type: 'Common Stock',
  },
  {
    symbol: 'JNJ',
    name: 'Johnson & Johnson',
    exchange: 'NYSE',
    currency: 'USD',
    mic_code: 'XNYS',
    country: 'United States',
    type: 'Common Stock',
  },
]

const STOCK_DATA: Record<string, {basePrice: number; trend: 1 | -1}> =
  {
    AAPL: {basePrice: 175.5, trend: 1},
    MSFT: {basePrice: 350.0, trend: 1},
    GOOGL: {basePrice: 140.0, trend: 1},
    AMZN: {basePrice: 130.0, trend: 1},
    META: {basePrice: 320.0, trend: -1},
    TSLA: {basePrice: 240.0, trend: 1},
    NVDA: {basePrice: 450.0, trend: 1},
    JPM: {basePrice: 145.0, trend: -1},
    BAC: {basePrice: 33.0, trend: -1},
    WMT: {basePrice: 60.0, trend: 1},
    PG: {basePrice: 155.0, trend: -1},
    DIS: {basePrice: 90.0, trend: 1},
    NFLX: {basePrice: 430.0, trend: -1},
    XOM: {basePrice: 105.0, trend: 1},
    JNJ: {basePrice: 150.0, trend: -1},
  }

export async function fetchStockQuoteMock(
  symbol: string
): Promise<StockQuote> {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 200)
  )

  const stockInfo = MOCK_STOCKS.find(
    (stock) => stock.symbol === symbol
  ) || {
    symbol: symbol,
    name: `${symbol} Inc.`,
    exchange: 'NASDAQ',
    currency: 'USD',
    mic_code: 'XNGS',
    country: 'United States',
    type: 'Common Stock',
  }

  const data = STOCK_DATA[symbol] || {
    basePrice: 100,
    trend: Math.random() > 0.5 ? 1 : -1,
  }
  const basePrice = data.basePrice
  const now = new Date()
  const today = now.toISOString().split('T')[0] // YYYY-MM-DD

  const maxChange = basePrice * 0.02
  const trendFactor = data.trend * 0.005 * basePrice
  const randomComponent = Math.random() * maxChange * 2 - maxChange
  const change = parseFloat(
    (randomComponent + trendFactor).toFixed(2)
  )
  const percentChange = parseFloat(
    ((change / basePrice) * 100).toFixed(2)
  )

  const close = parseFloat((basePrice + change).toFixed(2))
  const open = parseFloat(
    (basePrice + (Math.random() * 2 - 1)).toFixed(2)
  )
  const high = parseFloat(
    (
      Math.max(close, open) +
      Math.random() * basePrice * 0.01
    ).toFixed(2)
  )
  const low = parseFloat(
    (
      Math.min(close, open) -
      Math.random() * basePrice * 0.01
    ).toFixed(2)
  )

  return {
    symbol: stockInfo.symbol,
    name: stockInfo.name,
    exchange: stockInfo.exchange,
    mic_code: stockInfo.mic_code,
    currency: stockInfo.currency,
    datetime: today,
    timestamp: Math.floor(now.getTime() / 1000),
    open: open,
    high: high,
    low: low,
    close: close,
    volume: Math.floor(100000 + Math.random() * 10000000),
    previous_close: basePrice,
    change: change,
    percent_change: percentChange,
    is_market_open:
      now.getHours() >= 9 &&
      now.getHours() < 16 &&
      now.getDay() >= 1 &&
      now.getDay() <= 5,
  }
}

export async function getStockSymbolsMock(): Promise<StockSymbol[]> {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 300 + 100)
  )
  return [...MOCK_STOCKS]
}

export async function fetchHistoricalDataMock(
  symbol: string
): Promise<CandleData> {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 400 + 200)
  )

  const data = STOCK_DATA[symbol] || {
    basePrice: 100,
    trend: Math.random() > 0.5 ? 1 : -1,
  }
  const basePrice = data.basePrice
  const trend = data.trend

  const values = []
  const now = new Date()
  let currentPrice = basePrice

  for (let i = 30; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    if (date.getDay() === 0 || date.getDay() === 6) continue

    const volatility = 0.02
    const trendBias = trend * 0.005
    const dayChange =
      (Math.random() * 2 - 1 + trendBias) * volatility * basePrice

    currentPrice = Math.max(currentPrice + dayChange, basePrice * 0.5)

    const open = parseFloat((currentPrice - dayChange / 2).toFixed(2))
    const close = parseFloat(currentPrice.toFixed(2))
    const high = parseFloat(
      (
        Math.max(open, close) +
        Math.random() * basePrice * 0.01
      ).toFixed(2)
    )
    const low = parseFloat(
      (
        Math.min(open, close) -
        Math.random() * basePrice * 0.01
      ).toFixed(2)
    )
    const volume = Math.floor(10000 + Math.random() * 1000000)

    const datetime = date.toISOString().split('T')[0]

    values.push({
      datetime: datetime,
      open: open,
      high: high,
      low: low,
      close: close,
      volume: volume,
    })
  }

  values.sort(
    (a, b) =>
      new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
  )

  return {
    meta: {
      symbol: symbol,
      interval: '1month',
      currency: 'USD',
      exchange_timezone: 'America/New_York',
      exchange: 'NASDAQ',
      mic_code: 'XNGS',
      type: 'Common Stock',
    },
    values: values,
    status: 'ok',
  }
}

export async function fetchRSIMock(symbol: string): Promise<RSIData> {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 300 + 100)
  )

  const data = STOCK_DATA[symbol] || {
    basePrice: 100,
    trend: Math.random() > 0.5 ? 1 : -1,
  }
  const trend = data.trend

  const candles = await fetchHistoricalDataMock(symbol)

  const baseRsi = trend > 0 ? 60 : 40

  const values = candles.values.map((candle) => {
    const randomFactor = Math.random() * 20 - 10
    const rsi = parseFloat((baseRsi + randomFactor).toFixed(2))

    return {
      datetime: candle.datetime,
      rsi: Math.max(0, Math.min(100, rsi)),
    }
  })

  return {
    meta: {
      symbol: symbol,
      interval: '1month',
      indicator: {
        name: 'RSI - Relative Strength Index',
        series_type: 'close',
        time_period: 10,
      },
    },
    values: values,
    status: 'ok',
  }
}

export async function fetchMACDMock(
  symbol: string
): Promise<MACDData> {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 300 + 100)
  )

  const data = STOCK_DATA[symbol] || {
    basePrice: 100,
    trend: Math.random() > 0.5 ? 1 : -1,
  }
  const trend = data.trend

  const candles = await fetchHistoricalDataMock(symbol)

  const baseMacd = trend

  const values = candles.values.map((candle) => {
    const macd = parseFloat(
      (baseMacd + (Math.random() * 2 - 1)).toFixed(4)
    )
    const signal = parseFloat(
      (macd - trend * 0.2 + (Math.random() * 0.4 - 0.2)).toFixed(4)
    )
    const hist = parseFloat((macd - signal).toFixed(4))

    return {
      datetime: candle.datetime,
      macd: macd,
      macd_signal: signal,
      macd_hist: hist,
    }
  })

  return {
    meta: {
      symbol: symbol,
      interval: '1month',
      indicator: {
        name: 'MACD - Moving Average Convergence Divergence',
        fast_period: 12,
        series_type: 'close',
        signal_period: 9,
        slow_period: 26,
      },
    },
    values: values,
    status: 'ok',
  }
}

export async function searchStocksMock(
  keywords: string
): Promise<StockSymbol[]> {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 200)
  )

  const lowerQuery = keywords.toLowerCase()
  return MOCK_STOCKS.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(lowerQuery) ||
      stock.name.toLowerCase().includes(lowerQuery)
  )
}
