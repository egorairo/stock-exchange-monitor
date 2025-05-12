import {StockQuote, StockSymbol, CandleData} from '../types/stock'

const MOCK_STOCKS: StockSymbol[] = [
  {
    symbol: 'AAPL',
    description: 'Apple Inc.',
    displaySymbol: 'AAPL',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'MSFT',
    description: 'Microsoft Corporation',
    displaySymbol: 'MSFT',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'GOOGL',
    description: 'Alphabet Inc.',
    displaySymbol: 'GOOGL',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'AMZN',
    description: 'Amazon.com Inc.',
    displaySymbol: 'AMZN',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'META',
    description: 'Meta Platforms, Inc.',
    displaySymbol: 'META',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'TSLA',
    description: 'Tesla, Inc.',
    displaySymbol: 'TSLA',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'NVDA',
    description: 'NVIDIA Corporation',
    displaySymbol: 'NVDA',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'JPM',
    description: 'JPMorgan Chase & Co.',
    displaySymbol: 'JPM',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'BAC',
    description: 'Bank of America Corporation',
    displaySymbol: 'BAC',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'WMT',
    description: 'Walmart Inc.',
    displaySymbol: 'WMT',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'PG',
    description: 'Procter & Gamble Co.',
    displaySymbol: 'PG',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'DIS',
    description: 'Walt Disney Co.',
    displaySymbol: 'DIS',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'NFLX',
    description: 'Netflix, Inc.',
    displaySymbol: 'NFLX',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'XOM',
    description: 'Exxon Mobil Corporation',
    displaySymbol: 'XOM',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'JNJ',
    description: 'Johnson & Johnson',
    displaySymbol: 'JNJ',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'V',
    description: 'Visa Inc.',
    displaySymbol: 'V',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'MA',
    description: 'Mastercard Incorporated',
    displaySymbol: 'MA',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'PFE',
    description: 'Pfizer Inc.',
    displaySymbol: 'PFE',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'CSCO',
    description: 'Cisco Systems, Inc.',
    displaySymbol: 'CSCO',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'INTC',
    description: 'Intel Corporation',
    displaySymbol: 'INTC',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'CRM',
    description: 'Salesforce, Inc.',
    displaySymbol: 'CRM',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'AMD',
    description: 'Advanced Micro Devices, Inc.',
    displaySymbol: 'AMD',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'PYPL',
    description: 'PayPal Holdings, Inc.',
    displaySymbol: 'PYPL',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'ADBE',
    description: 'Adobe Inc.',
    displaySymbol: 'ADBE',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'COST',
    description: 'Costco Wholesale Corporation',
    displaySymbol: 'COST',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'NKE',
    description: 'Nike, Inc.',
    displaySymbol: 'NKE',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'UNH',
    description: 'UnitedHealth Group Incorporated',
    displaySymbol: 'UNH',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'T',
    description: 'AT&T Inc.',
    displaySymbol: 'T',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'VZ',
    description: 'Verizon Communications Inc.',
    displaySymbol: 'VZ',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'MCD',
    description: "McDonald's Corporation",
    displaySymbol: 'MCD',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'KO',
    description: 'The Coca-Cola Company',
    displaySymbol: 'KO',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'IBM',
    description: 'International Business Machines Corporation',
    displaySymbol: 'IBM',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'SBUX',
    description: 'Starbucks Corporation',
    displaySymbol: 'SBUX',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'GE',
    description: 'General Electric Company',
    displaySymbol: 'GE',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'QCOM',
    description: 'QUALCOMM Incorporated',
    displaySymbol: 'QCOM',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'BA',
    description: 'The Boeing Company',
    displaySymbol: 'BA',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'SPCE',
    description: 'Virgin Galactic Holdings, Inc.',
    displaySymbol: 'SPCE',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'AMC',
    description: 'AMC Entertainment Holdings, Inc.',
    displaySymbol: 'AMC',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'GME',
    description: 'GameStop Corp.',
    displaySymbol: 'GME',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'F',
    description: 'Ford Motor Company',
    displaySymbol: 'F',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
  {
    symbol: 'AAL',
    description: 'American Airlines Group Inc.',
    displaySymbol: 'AAL',
    currency: 'USD',
    figi: '',
    mic: '',
    type: 'Common Stock',
  },
]

const BASE_PRICES: Record<string, number> = {
  AAPL: 175.5,
  MSFT: 350.0,
  GOOGL: 140.0,
  AMZN: 130.0,
  META: 320.0,
  TSLA: 240.0,
  NVDA: 450.0,
  JPM: 145.0,
  BAC: 33.0,
  WMT: 60.0,
  PG: 155.0,
  DIS: 90.0,
  NFLX: 430.0,
  XOM: 105.0,
  JNJ: 150.0,
  V: 260.0,
  MA: 435.0,
  PFE: 28.0,
  CSCO: 48.0,
  INTC: 42.0,
  CRM: 225.0,
  AMD: 120.0,
  PYPL: 65.0,
  ADBE: 480.0,
  COST: 550.0,
  NKE: 95.0,
  UNH: 490.0,
  T: 18.0,
  VZ: 40.0,
  MCD: 280.0,
  KO: 60.0,
  IBM: 145.0,
  SBUX: 95.0,
  GE: 120.0,
  QCOM: 150.0,
  BA: 190.0,
  SPCE: 25.0,
  AMC: 8.0,
  GME: 20.0,
  F: 12.0,
  AAL: 15.0,
}

const STOCK_TRENDS: Record<string, number> = {
  AAPL: 1,
  MSFT: 1,
  GOOGL: 1,
  AMZN: 1,
  META: -1,
  TSLA: 1,
  NVDA: 1,
  JPM: -1,
  BAC: -1,
  WMT: 1,
  PG: -1,
  DIS: 1,
  NFLX: -1,
  XOM: 1,
  JNJ: -1,
  V: 1,
  MA: 1,
  PFE: -1,
  CSCO: -1,
  INTC: -1,
  CRM: 1,
  AMD: 1,
  PYPL: -1,
  ADBE: 1,
  COST: 1,
  NKE: -1,
  UNH: 1,
  T: -1,
  VZ: -1,
  MCD: 1,
  KO: 1,
  IBM: -1,
  SBUX: 1,
  GE: -1,
  QCOM: 1,
  BA: -1,
  SPCE: -1,
  AMC: -1,
  GME: -1,
  F: 1,
  AAL: -1,
}

function generateRandomChange(
  basePrice: number,
  symbol: string
): {
  price: number
  change: number
  percentChange: number
} {
  const trend = STOCK_TRENDS[symbol] || (Math.random() > 0.5 ? 1 : -1)
  const maxChange = basePrice * 0.02
  const trendBias = trend * 0.005 * basePrice
  const randomComponent = Math.random() * maxChange * 2 - maxChange
  const change = randomComponent + trendBias
  const price = parseFloat((basePrice + change).toFixed(2))
  const percentChange = parseFloat(
    ((change / basePrice) * 100).toFixed(2)
  )
  return {
    price,
    change,
    percentChange,
  }
}

export async function fetchStockQuote(
  symbol: string
): Promise<StockQuote> {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 200)
  )
  const basePrice = BASE_PRICES[symbol] || 100 + Math.random() * 200
  const now = Date.now()

  const prevPrice = basePrice
  const {price, change, percentChange} = generateRandomChange(
    prevPrice,
    symbol
  )
  return {
    c: price,
    d: change,
    dp: percentChange,
    h: price + Math.random() * basePrice * 0.01,
    l: price - Math.random() * basePrice * 0.01,
    o: prevPrice,
    pc: prevPrice,
    t: now,
  }
}

export async function getStockSymbols(): Promise<StockSymbol[]> {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 300 + 100)
  )
  return [...MOCK_STOCKS]
}

export async function fetchHistoricalData(
  symbol: string
): Promise<CandleData> {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 400 + 200)
  )
  const basePrice = BASE_PRICES[symbol] || 100
  const trend = STOCK_TRENDS[symbol] || (Math.random() > 0.5 ? 1 : -1)
  const days = 30
  const now = new Date()
  const timestamps: number[] = []
  const opens: number[] = []
  const highs: number[] = []
  const lows: number[] = []
  const closes: number[] = []
  const volumes: number[] = []
  let currentPrice = basePrice
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    if (date.getDay() === 0 || date.getDay() === 6) {
      continue
    }
    timestamps.push(Math.floor(date.getTime() / 1000))
    const volatility = 0.02
    const trendBias = trend * 0.005
    const dayChange =
      (Math.random() * 2 - 1 + trendBias) * volatility * basePrice
    currentPrice += dayChange
    currentPrice = Math.max(currentPrice, basePrice * 0.5)
    const open = currentPrice - dayChange / 2
    const close = currentPrice
    const high =
      Math.max(open, close) + Math.random() * basePrice * 0.01
    const low =
      Math.min(open, close) - Math.random() * basePrice * 0.01
    opens.push(parseFloat(open.toFixed(2)))
    highs.push(parseFloat(high.toFixed(2)))
    lows.push(parseFloat(low.toFixed(2)))
    closes.push(parseFloat(close.toFixed(2)))
    const volume = Math.floor(1000000 + Math.random() * 10000000)
    volumes.push(volume)
  }
  return {
    c: closes,
    h: highs,
    l: lows,
    o: opens,
    s: 'ok',
    t: timestamps,
    v: volumes,
  }
}

export async function searchStocks(
  keywords: string
): Promise<StockSymbol[]> {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 300)
  )
  const lowerQuery = keywords.toLowerCase()
  return MOCK_STOCKS.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(lowerQuery) ||
      stock.description.toLowerCase().includes(lowerQuery)
  )
}

export async function getMarketTrend(): Promise<{
  up: number
  down: number
  unchanged: number
}> {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 200)
  )
  const up = Object.values(STOCK_TRENDS).filter((t) => t > 0).length
  const down = Object.values(STOCK_TRENDS).filter((t) => t < 0).length
  const unchanged = Object.values(STOCK_TRENDS).filter(
    (t) => t === 0
  ).length
  return {up, down, unchanged}
}
