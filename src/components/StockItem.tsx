'use client'

import React from 'react'
import {Stock} from '@/lib/types/stock'

interface StockItemProps {
  stock: Stock
  onSelect: (symbol: string) => void
  isSelected: boolean
}

export const StockItem = ({
  stock,
  onSelect,
  isSelected,
}: StockItemProps) => {
  return (
    <div
      className={`p-4 border-b border-neutral-700 hover:bg-neutral-800 flex justify-between items-center cursor-pointer transition-colors ${
        isSelected && 'bg-neutral-800'
      }`}
      onClick={() => onSelect(stock.symbol)}
    >
      <div className="flex flex-col">
        <div className="font-bold">{stock.symbol}</div>
        <div className="text-sm text-neutral-400">
          {stock.description}
        </div>
      </div>
      <div>
        <div className="text-right font-mono">
          ${stock.currentPrice.toFixed(2)}
        </div>
        <div
          className={`text-right font-mono ${
            stock.isGrowing ? 'price-up' : 'price-down'
          }`}
        >
          {stock.priceChange > 0 ? '+' : ''}
          {stock.priceChange.toFixed(2)} (
          {stock.percentChange.toFixed(2)}%)
        </div>
      </div>
    </div>
  )
}
