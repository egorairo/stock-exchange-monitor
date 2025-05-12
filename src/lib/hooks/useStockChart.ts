'use client'

import {useState, useEffect, useCallback} from 'react'
import {fetchHistoricalData} from '../services/alphaVantageService'
import {
  calculateRSI,
  calculateMACD,
} from '../utils/technicalIndicators'

export function useStockChart(symbol: string | null) {
  const [chartData, setChartData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const processChartData = useCallback((data: any) => {
    if (!data || data.s !== 'ok') {
      throw new Error('Invalid data format')
    }

    const simplifiedData = data.t.map(
      (timestamp: number, index: number) => {
        const date = new Date(timestamp * 1000)
        return {
          date: date.toLocaleDateString(),
          time: timestamp * 1000, // в миллисекундах для Highcharts
          open: data.o[index],
          high: data.h[index],
          low: data.l[index],
          close: data.c[index],
          price: data.c[index],
          volume: data.v[index],
        }
      }
    )

    const closePrices = data.c
    const rsiValues = calculateRSI(closePrices)
    const macdValues = calculateMACD(closePrices)

    return simplifiedData.map((point: any, index: number) => ({
      ...point,
      rsi: rsiValues[index] || 0,
      macd: macdValues.macd[index] || 0,
      signal: macdValues.signal[index] || 0,
      histogram: macdValues.histogram[index] || 0,
    }))
  }, [])

  const fetchData = useCallback(async () => {
    if (!symbol) {
      setChartData([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const data = await fetchHistoricalData(symbol)
      const processedData = processChartData(data)

      setChartData(processedData)
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
  }, [symbol, processChartData])

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
  }
}
