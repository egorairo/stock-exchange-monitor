import {NextRequest, NextResponse} from 'next/server'
import {
  StockSymbol,
  StockQuote,
  Stock,
  StockFilter,
} from '@/lib/types/stock'
import {
  getStockSymbols,
  fetchStockQuote,
} from '@/lib/services/twelveDataService'

const symbolsCache: {
  data: StockSymbol[] | null
  timestamp: number
} = {
  data: null,
  timestamp: 0,
}

const quotesCache: {
  [symbol: string]: {quote: StockQuote; timestamp: number}
} = {}

const QUOTES_CACHE_TTL = 30 * 1000 // 30 секунд
const SYMBOLS_CACHE_TTL = 24 * 60 * 60 * 1000 // 24 часа

const DEFAULT_PAGE_SIZE = 10

async function getSymbolsWithCache(): Promise<StockSymbol[]> {
  const now = Date.now()

  if (
    symbolsCache.data &&
    now - symbolsCache.timestamp < SYMBOLS_CACHE_TTL
  ) {
    return symbolsCache.data
  }

  try {
    const symbols = await getStockSymbols()
    symbolsCache.data = symbols
    symbolsCache.timestamp = now
    return symbols
  } catch (error) {
    console.error('Error fetching stock symbols:', error)

    if (symbolsCache.data) {
      return symbolsCache.data
    }

    throw error
  }
}

function mapQuoteToStock(
  symbol: StockSymbol,
  quote: StockQuote
): Stock {
  return {
    symbol: symbol.symbol,
    name: symbol.name,
    exchange: symbol.exchange,
    currentPrice: quote.close,
    previousClose: quote.previous_close,
    openPrice: quote.open,
    priceChange: quote.change,
    percentChange: quote.percent_change,
    isGrowing: quote.close > quote.open,
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(
      searchParams.get('pageSize') || DEFAULT_PAGE_SIZE.toString()
    )
    const filter =
      (searchParams.get('filter') as StockFilter) || StockFilter.ALL
    const searchQuery = searchParams.get('search') || ''

    let symbols: StockSymbol[]
    try {
      symbols = await getSymbolsWithCache()
    } catch (error) {
      console.error('Error fetching stock symbols:', error)
      return NextResponse.json(
        {error: 'Failed to fetch stock symbols'},
        {status: 500}
      )
    }

    if (searchQuery) {
      symbols = symbols.filter(
        (symbol) =>
          symbol.symbol
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          symbol.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    }

    const startIndex = (page - 1) * pageSize
    const endIndex = Math.min(startIndex + pageSize, symbols.length)
    const pageSymbols = symbols.slice(startIndex, endIndex)

    const now = Date.now()
    const quotesPromises = pageSymbols.map(async (symbol, index) => {
      if (index > 0) {
        await new Promise((resolve) => setTimeout(resolve, 200))
      }

      const cachedQuote = quotesCache[symbol.symbol]
      if (
        cachedQuote &&
        now - cachedQuote.timestamp < QUOTES_CACHE_TTL
      ) {
        return {
          symbol,
          quote: cachedQuote.quote,
        }
      }

      try {
        const quote = await fetchStockQuote(symbol.symbol)

        quotesCache[symbol.symbol] = {quote, timestamp: now}

        return {
          symbol,
          quote,
        }
      } catch (error) {
        console.error(
          `Error fetching quote for ${symbol.symbol}:`,
          error
        )

        if (cachedQuote) {
          return {
            symbol,
            quote: cachedQuote.quote,
          }
        }

        const defaultQuote: StockQuote = {
          symbol: symbol.symbol,
          name: symbol.name,
          exchange: symbol.exchange,
          mic_code: symbol.mic_code,
          currency: symbol.currency,
          datetime: new Date().toISOString().split('T')[0],
          timestamp: Math.floor(Date.now() / 1000),
          open: 0,
          high: 0,
          low: 0,
          close: 0,
          volume: 0,
          previous_close: 0,
          change: 0,
          percent_change: 0,
          is_market_open: false,
        }

        return {
          symbol,
          quote: defaultQuote,
        }
      }
    })

    const stocksWithQuotes = await Promise.all(quotesPromises)

    let stocks = stocksWithQuotes.map((item) =>
      mapQuoteToStock(item.symbol, item.quote)
    )

    if (filter !== StockFilter.ALL) {
      stocks = stocks.filter(
        (stock) =>
          (filter === StockFilter.GROWING && stock.isGrowing) ||
          (filter === StockFilter.FALLING && !stock.isGrowing)
      )
    }

    const totalFilteredItems = searchQuery
      ? symbols.length
      : filter !== StockFilter.ALL
      ? Math.max(symbols.length / 2, pageSize * 2)
      : symbols.length

    return NextResponse.json({
      stocks,
      pagination: {
        totalItems: totalFilteredItems,
        totalPages: Math.ceil(totalFilteredItems / pageSize),
        currentPage: page,
        pageSize,
      },
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      {error: 'Failed to fetch stocks data'},
      {status: 500}
    )
  }
}
