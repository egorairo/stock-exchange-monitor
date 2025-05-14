'use client'

import {useState, useEffect, useCallback} from 'react'
import {ChartDataPoint} from '../types/stock'

interface UseStockChartResult {
  chartData: ChartDataPoint[]
  loading: boolean
  error: string | null
  refreshChart: () => Promise<void>
}

export function useStockChart(
  symbol: string | null,
  interval: string = '1month'
): UseStockChartResult {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    if (!symbol) {
      setChartData([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(
        `/api/historical?symbol=${symbol}&interval=${interval}`
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.error || 'Failed to load chart data'
        )
      }

      const data = await response.json()

      if (!data.chartData || !Array.isArray(data.chartData)) {
        throw new Error('Invalid data format received from API')
      }

      setChartData(data.chartData)
      setLoading(false)
    } catch (err) {
      console.error(`Error fetching chart data for ${symbol}:`, err)
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load chart data'
      )
      setLoading(false)
    }
  }, [symbol, interval])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (!symbol) return

    const intervalId = setInterval(fetchData, 5 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [symbol, fetchData])

  return {
    chartData,
    loading,
    error,
    refreshChart: fetchData,
  }
}
