// app/api/stocks/route.ts
import {NextRequest, NextResponse} from 'next/server'
import {StockSymbol, StockQuote} from '@/lib/types/stock'
import {
  getStockSymbols,
  fetchStockQuote,
} from '@/lib/services/alphaVantageService'

// Кэширование данных для уменьшения количества запросов к API
let symbolsCache: StockSymbol[] | null = null
const quotesCache: {
  [symbol: string]: {quote: StockQuote; timestamp: number}
} = {}

// Максимальное время кэширования в миллисекундах
const QUOTES_CACHE_TTL = 30 * 1000 // 30 секунд
const SYMBOLS_CACHE_TTL = 24 * 60 * 60 * 1000 // 24 часа

// Время последнего обновления символов
let lastSymbolsUpdate = 0

// Количество акций на страницу (для пагинации)
const PAGE_SIZE = 20

export async function GET(request: NextRequest) {
  try {
    // Получаем параметры запроса
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(
      searchParams.get('pageSize') || PAGE_SIZE.toString()
    )

    // Получаем символы акций (используем кэш, если возможно)
    let symbols: StockSymbol[] = []

    const now = Date.now()

    if (symbolsCache && now - lastSymbolsUpdate < SYMBOLS_CACHE_TTL) {
      symbols = symbolsCache
    } else {
      try {
        symbols = await getStockSymbols()
        symbolsCache = symbols
        lastSymbolsUpdate = now
      } catch (error) {
        console.error('Error fetching stock symbols:', error)
        return NextResponse.json(
          {error: 'Failed to fetch stock symbols'},
          {status: 500}
        )
      }
    }

    // Определяем символы для текущей страницы
    const startIndex = (page - 1) * pageSize
    const endIndex = Math.min(startIndex + pageSize, symbols.length)
    const pageSymbols = symbols.slice(startIndex, endIndex)

    // Получаем цены для символов текущей страницы
    const stocksWithQuotes = await Promise.all(
      pageSymbols.map(async (symbol) => {
        let quote: StockQuote

        // Проверяем кэш
        const cachedQuote = quotesCache[symbol.symbol]
        if (
          cachedQuote &&
          now - cachedQuote.timestamp < QUOTES_CACHE_TTL
        ) {
          quote = cachedQuote.quote
        } else {
          try {
            // Polygon.io имеет ограничение на 5 запросов в минуту для базового плана
            // В премиум плане ограничения намного выше
            // Добавляем задержку между запросами для избежания превышения лимита
            const index = pageSymbols.indexOf(symbol)
            if (index > 0 && process.env.NODE_ENV !== 'production') {
              // Задержка только в режиме разработки или если у вас базовый план
              await new Promise((resolve) => setTimeout(resolve, 300)) // 300 мс задержка
            }

            quote = await fetchStockQuote(symbol.symbol)
            quotesCache[symbol.symbol] = {quote, timestamp: now}
          } catch (error) {
            console.error(
              `Error fetching quote for ${symbol.symbol}:`,
              error
            )

            // Если произошла ошибка, используем дефолтные значения или кэшированные данные
            if (cachedQuote) {
              quote = cachedQuote.quote
            } else {
              quote = {
                c: 0,
                d: 0,
                dp: 0,
                h: 0,
                l: 0,
                o: 0,
                pc: 0,
                t: 0,
              }
            }
          }
        }

        return {
          ...symbol,
          quote,
        }
      })
    )

    // Возвращаем результаты с метаданными для пагинации
    return NextResponse.json({
      stocks: stocksWithQuotes,
      pagination: {
        totalItems: symbols.length,
        totalPages: Math.ceil(symbols.length / pageSize),
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
