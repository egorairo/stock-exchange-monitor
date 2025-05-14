import {NextRequest, NextResponse} from 'next/server'
import {
  fetchHistoricalData,
  fetchRSI,
  fetchMACD,
} from '@/lib/services/twelveDataService'
import {ChartDataPoint} from '@/lib/types/stock'

const dataCache: {
  [key: string]: {
    chartData: ChartDataPoint[]
    timestamp: number
  }
} = {}

const CACHE_TTL = 60 * 60 * 1000

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const symbol = searchParams.get('symbol')
    const interval = searchParams.get('interval') || '1month'

    if (!symbol) {
      return NextResponse.json(
        {error: 'Symbol parameter is required'},
        {status: 400}
      )
    }

    const cacheKey = `${symbol}-${interval}`
    const now = Date.now()

    const cachedData = dataCache[cacheKey]
    if (cachedData && now - cachedData.timestamp < CACHE_TTL) {
      return NextResponse.json({
        chartData: cachedData.chartData,
      })
    }

    const [candleData, rsiData, macdData] = await Promise.all([
      fetchHistoricalData(symbol, interval),
      fetchRSI(symbol, interval),
      fetchMACD(symbol, interval),
    ])

    if (
      candleData.status !== 'ok' ||
      !candleData.values ||
      candleData.values.length === 0
    ) {
      throw new Error('Invalid historical data received')
    }

    const sortedCandles = [...candleData.values].reverse()
    const sortedRsi = [...rsiData.values].reverse()
    const sortedMacd = [...macdData.values].reverse()

    const rsiMap = new Map(
      sortedRsi.map((item) => [item.datetime, item.rsi])
    )
    const macdMap = new Map(
      sortedMacd.map((item) => [
        item.datetime,
        {
          macd: item.macd,
          macd_signal: item.macd_signal,
          macd_hist: item.macd_hist,
        },
      ])
    )

    const chartData: ChartDataPoint[] = sortedCandles.map(
      (candle) => {
        const timestamp = new Date(candle.datetime).getTime()

        const rsi = rsiMap.get(candle.datetime)
        const macd = macdMap.get(candle.datetime)

        return {
          datetime: candle.datetime,
          timestamp,
          open: candle.open,
          high: candle.high,
          low: candle.low,
          close: candle.close,
          volume: candle.volume,
          rsi: rsi || undefined,
          macd: macd ? macd.macd : undefined,
          macd_signal: macd ? macd.macd_signal : undefined,
          macd_hist: macd ? macd.macd_hist : undefined,
        }
      }
    )

    dataCache[cacheKey] = {
      chartData,
      timestamp: now,
    }

    return NextResponse.json({
      chartData,
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      {error: 'Failed to fetch historical data'},
      {status: 500}
    )
  }
}
