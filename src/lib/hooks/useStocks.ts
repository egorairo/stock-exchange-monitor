'use client'

import {useState, useEffect, useCallback} from 'react'
import {Stock, StockFilter} from '../types/stock'

export function useStocks(
  updateInterval = 60 * 1000,
  initialPage = 1,
  initialPageSize = 10,
  searchDebounceMs = 300 // Debounce delay for search
) {
  const [filter, setFilter] = useState<StockFilter>(StockFilter.ALL)
  const [inputSearchQuery, setInputSearchQuery] = useState<string>('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] =
    useState<string>('')

  const [currentPage, setCurrentPage] = useState<number>(initialPage)
  const [pageSize, setPageSize] = useState<number>(initialPageSize)

  const [stocks, setStocks] = useState<Stock[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [paginationData, setPaginationData] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: initialPage,
    pageSize: initialPageSize,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(inputSearchQuery)
    }, searchDebounceMs)

    return () => {
      clearTimeout(timer)
    }
  }, [inputSearchQuery, searchDebounceMs])

  const fetchStocksData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const url = new URL('/api/stocks', window.location.origin)
      url.searchParams.append('page', currentPage.toString())
      url.searchParams.append('pageSize', pageSize.toString())

      if (filter !== StockFilter.ALL) {
        url.searchParams.append('filter', filter)
      }

      if (debouncedSearchQuery) {
        url.searchParams.append('search', debouncedSearchQuery)
      }

      const response = await fetch(url.toString())

      if (!response.ok) {
        throw new Error('Failed to fetch stocks from API')
      }

      const data = await response.json()

      if (!data.stocks || !Array.isArray(data.stocks)) {
        throw new Error('Invalid data format received from API')
      }

      setStocks(data.stocks)
      setPaginationData(data.pagination)
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
  }, [currentPage, pageSize, filter, debouncedSearchQuery])

  useEffect(() => {
    setCurrentPage(1)
  }, [filter, debouncedSearchQuery])

  useEffect(() => {
    fetchStocksData()

    let intervalId: NodeJS.Timeout | null = null
    if (updateInterval > 0) {
      intervalId = setInterval(fetchStocksData, updateInterval)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [
    currentPage,
    pageSize,
    filter,
    debouncedSearchQuery,
    fetchStocksData,
    updateInterval,
  ])

  const goToPage = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= paginationData.totalPages) {
        setCurrentPage(newPage)
      }
    },
    [paginationData.totalPages]
  )

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize)
    setCurrentPage(1)
  }, [])

  return {
    stocks,
    loading,
    error,
    filter,
    setFilter,
    searchQuery: inputSearchQuery,
    setSearchQuery: setInputSearchQuery,
    refreshStocks: fetchStocksData,
    pagination: paginationData,
    goToPage,
    setPageSize: handlePageSizeChange,
    totalFilteredCount: paginationData.totalItems,
  }
}
