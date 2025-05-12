'use client'

import {useState, useEffect, useMemo, useCallback} from 'react'
import {Stock, StockFilter} from '../types/stock'
import {
  getStockSymbols,
  fetchStockQuote,
} from '../services/alphaVantageService'

function mapToStock(
  symbol: string,
  description: string,
  quote: any
): Stock | null {
  if (!symbol || !quote) {
    console.warn('Invalid stock data format')
    return null
  }

  return {
    symbol,
    description: description || symbol,
    currentPrice: quote.c || 0,
    previousClose: quote.pc || 0,
    openPrice: quote.o || 0,
    priceChange: quote.d || 0,
    percentChange: quote.dp || 0,
    isGrowing: quote.c > quote.o,
  }
}

export function useStocks(
  updateInterval = 20000,
  initialPage = 1,
  initialPageSize = 20
) {
  const [filter, setFilter] = useState<StockFilter>(StockFilter.ALL)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const [page, setPage] = useState<number>(initialPage)
  const [pageSize, setPageSizeState] =
    useState<number>(initialPageSize)

  const [stocks, setStocks] = useState<Stock[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [totalStocks, setTotalStocks] = useState<number>(0)

  const fetchStocksData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const symbols = await getStockSymbols()
      setTotalStocks(symbols.length)

      const startIndex = (page - 1) * pageSize
      const endIndex = Math.min(startIndex + pageSize, symbols.length)
      const pageSymbols = symbols.slice(startIndex, endIndex)

      const stocksPromises = pageSymbols.map(async (symbolInfo) => {
        try {
          const quote = await fetchStockQuote(symbolInfo.symbol)
          return mapToStock(
            symbolInfo.symbol,
            symbolInfo.description,
            quote
          )
        } catch (err) {
          console.error(
            `Error fetching quote for ${symbolInfo.symbol}:`,
            err
          )
          return null
        }
      })

      const stocksData = await Promise.all(stocksPromises)

      setStocks(stocksData.filter(Boolean) as Stock[])
      setLoading(false)
    } catch (err) {
      console.error('Error loading stock data:', err)
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load stock data'
      )
      setLoading(false)
    }
  }, [page, pageSize])

  useEffect(() => {
    fetchStocksData()

    let intervalId: NodeJS.Timeout | null = null
    if (updateInterval > 0) {
      intervalId = setInterval(fetchStocksData, updateInterval)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [page, pageSize, updateInterval, fetchStocksData])

  const filteredStocks = useMemo(() => {
    return stocks.filter((stock) => {
      const matchesFilter =
        filter === StockFilter.ALL ||
        (filter === StockFilter.GROWING && stock.isGrowing) ||
        (filter === StockFilter.FALLING && !stock.isGrowing)

      const matchesSearch =
        !searchQuery ||
        stock.symbol
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        stock.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase())

      return matchesFilter && matchesSearch
    })
  }, [stocks, filter, searchQuery])

  const pagination = useMemo(() => {
    return {
      totalItems: totalStocks,
      totalPages: Math.ceil(totalStocks / pageSize),
      currentPage: page,
      pageSize: pageSize,
    }
  }, [totalStocks, page, pageSize])

  const goToPage = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= pagination.totalPages) {
        setPage(newPage)
      }
    },
    [pagination.totalPages]
  )

  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      const firstItemIndex = (page - 1) * pageSize + 1
      const newPage = Math.ceil(firstItemIndex / newPageSize)

      setPageSizeState(newPageSize)
      setPage(newPage)
    },
    [page, pageSize]
  )

  return {
    stocks: filteredStocks,
    loading,
    error,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    refreshStocks: fetchStocksData,
    pagination,
    goToPage,
    setPageSize: handlePageSizeChange,
  }
}
