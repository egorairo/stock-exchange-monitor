'use client'

import React, {useState} from 'react'
import {StockList} from './StockList'
import {StockChart} from './StockChart'
import {useStocks} from '@/lib/hooks/useStocks'
import {StockListSkeleton} from './skeletons/StockListSkeleton'

interface StockMonitorProps {
  refreshInterval?: number
}

export const StockMonitor: React.FC<StockMonitorProps> = ({
  refreshInterval = 20000,
}) => {
  const {
    stocks,
    loading,
    error,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    refreshStocks,
    pagination,
    goToPage,
    setPageSize,
  } = useStocks(refreshInterval)

  // State for selected stock
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(
    stocks.length > 0 ? stocks[0].symbol : null
  )

  const handleStockSelect = (symbol: string) => {
    setSelectedSymbol(symbol)
  }

  const handlePageChange = (newPage: number) => {
    goToPage(newPage)
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
        Stock Exchange Monitor
      </h1>

      <div className="flex flex-col md:flex-row gap-8 w-full">
        <div className="w-full max-w-[480px] h-full">
          <div className="stock-card p-4">
            {loading ? (
              <StockListSkeleton />
            ) : (
              <StockList
                stocks={stocks}
                loading={loading}
                error={error}
                filter={filter}
                onFilterChange={setFilter}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onRefresh={refreshStocks}
                selectedSymbol={selectedSymbol}
                onSelectStock={handleStockSelect}
                pagination={pagination}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            )}
          </div>
        </div>

        <div className="w-full">
          {selectedSymbol ? (
            <div className="stock-card p-4">
              <StockChart symbol={selectedSymbol} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full stock-card p-4">
              <p className="text-neutral-400">
                Select a stock to view the chart
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
