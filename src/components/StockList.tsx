'use client'

import React from 'react'
import {StockItem} from './StockItem'
import {Stock} from '@/lib/types/stock'
import {StockFilter} from '@/lib/types/stock'
import {Pagination} from './Pagination'

interface StockListProps {
  stocks: Stock[]
  loading: boolean
  error: string | null
  filter: StockFilter
  onFilterChange: (filter: StockFilter) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onRefresh: () => void
  selectedSymbol: string | null
  onSelectStock: (symbol: string) => void
  pagination?: {
    totalItems: number
    totalPages: number
    currentPage: number
    pageSize: number
  }
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

export const StockList: React.FC<StockListProps> = ({
  stocks,
  error,
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  onRefresh,
  selectedSymbol,
  onSelectStock,
  pagination,
  onPageChange,
  onPageSizeChange,
}) => {
  if (error) {
    return (
      <div className="text-center p-4 text-danger">
        {error}
        <button
          onClick={onRefresh}
          className="ml-2 px-3 py-1 bg-primary text-white rounded"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by symbol or name..."
          className="px-3 py-2 border border-neutral-700 rounded bg-neutral-800 text-neutral-100 w-full sm:w-auto focus:outline-none focus:ring-1 focus:ring-primary"
        />

        <div className="flex gap-2">
          <button
            onClick={() => onFilterChange(StockFilter.ALL)}
            className={`px-3 py-2 rounded transition-colors cursor-pointer ${
              filter === StockFilter.ALL
                ? 'bg-primary text-white'
                : 'bg-neutral-800 border border-neutral-700 hover:border-primary'
            }`}
          >
            All
          </button>
          <button
            onClick={() => onFilterChange(StockFilter.GROWING)}
            className={`px-3 py-2 rounded transition-colors bg-neutral-800 cursor-pointer ${
              filter === StockFilter.GROWING
                ? 'bg-success text-white'
                : 'bg-neutral-800 border border-neutral-700 hover:border-success'
            }`}
          >
            Growing
          </button>
          <button
            onClick={() => onFilterChange(StockFilter.FALLING)}
            className={`px-3 py-2 rounded transition-colors cursor-pointer ${
              filter === StockFilter.FALLING
                ? 'bg-danger text-white'
                : 'bg-neutral-800 border border-neutral-700 hover:border-danger'
            }`}
          >
            Falling
          </button>
        </div>
      </div>

      <div className="max-h-[540px] overflow-y-auto h-full">
        {stocks.length === 0 ? (
          <div className="text-center p-4 text-neutral-400">
            No stocks found
          </div>
        ) : (
          stocks.map((stock) => (
            <StockItem
              key={stock.symbol}
              stock={stock}
              onSelect={onSelectStock}
              isSelected={selectedSymbol === stock.symbol}
            />
          ))
        )}
      </div>

      {pagination && onPageChange && (
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-end">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={onPageChange}
          />

          {onPageSizeChange && (
            <div className="flex items-center mt-2 sm:mt-0">
              <span className="mr-2 text-neutral-400 text-sm">
                Items per page:
              </span>
              <select
                value={pagination?.pageSize}
                onChange={(e) =>
                  onPageSizeChange(Number(e.target.value))
                }
                className="border border-neutral-700 rounded px-2 py-1 text-sm bg-neutral-800 text-neutral-100"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
