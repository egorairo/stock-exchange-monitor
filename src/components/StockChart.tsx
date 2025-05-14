'use client'

import React, {useMemo} from 'react'
import {useStockChart} from '@/lib/hooks/useStockChart'
import {StockChartSkeleton} from './skeletons/StockChartSkeleton'
import dynamic from 'next/dynamic'

const HighchartsWrapper = dynamic(
  () => import('./HighchartsWrapper'),
  {
    ssr: false,
    loading: () => <StockChartSkeleton />,
  }
)

interface StockChartProps {
  symbol: string
  interval?: string
}

export const StockChart: React.FC<StockChartProps> = ({
  symbol,
  interval = '1month',
}) => {
  const {chartData, loading, error} = useStockChart(symbol, interval)

  const candlestickData = useMemo(() => {
    if (!chartData || chartData.length === 0) return []

    return chartData.map((point) => [
      point.timestamp,
      point.open,
      point.high,
      point.low,
      point.close,
    ])
  }, [chartData])

  const volumeData = useMemo(() => {
    if (!chartData || chartData.length === 0) return []

    return chartData.map((point) => [point.timestamp, point.volume])
  }, [chartData])

  const rsiData = useMemo(() => {
    if (!chartData || chartData.length === 0) return []

    return chartData
      .map((point) => [point.timestamp, point.rsi])
      .filter((item) => item[1] !== undefined)
  }, [chartData])

  const macdData = useMemo(() => {
    if (!chartData || chartData.length === 0) return []

    return chartData
      .map((point) => [point.timestamp, point.macd])
      .filter((item) => item[1] !== undefined)
  }, [chartData])

  const signalData = useMemo(() => {
    if (!chartData || chartData.length === 0) return []

    return chartData
      .map((point) => [point.timestamp, point.macd_signal])
      .filter((item) => item[1] !== undefined)
  }, [chartData])

  const histogramData = useMemo(() => {
    if (!chartData || chartData.length === 0) return []

    return chartData
      .map((point) => [point.timestamp, point.macd_hist])
      .filter((item) => item[1] !== undefined)
  }, [chartData])

  const options = useMemo(() => {
    return {
      chart: {
        height: '95%',
        style: {
          fontFamily: 'Inter, system-ui, sans-serif',
        },
      },

      time: {
        useUTC: false,
      },

      rangeSelector: {
        selected: 2,
        buttons: [
          {
            type: 'hour',
            count: 1,
            text: '1h',
          },
          {
            type: 'day',
            count: 1,
            text: '1d',
          },
          {
            type: 'week',
            count: 1,
            text: '1w',
          },
          {
            type: 'month',
            count: 1,
            text: '1m',
          },
        ],
      },

      title: {
        text: `${symbol} Stock Chart`,
      },

      subtitle: {
        text: 'With Technical Indicators',
      },

      navigator: {
        enabled: true,
      },

      scrollbar: {
        enabled: true,
      },

      xAxis: {
        type: 'datetime',
      },

      yAxis: [
        {
          labels: {
            align: 'right',
            x: -3,
          },
          title: {
            text: 'Price',
          },
          height: '60%',
          lineWidth: 2,
          resize: {
            enabled: true,
          },
        },
        {
          labels: {
            align: 'right',
            x: -3,
          },
          title: {
            text: 'Volume',
          },
          top: '60%',
          height: '10%',
          offset: 0,
          lineWidth: 2,
        },
        {
          labels: {
            align: 'right',
            x: -3,
          },
          title: {
            text: 'RSI',
          },
          top: '70%',
          height: '15%',
          offset: 0,
          lineWidth: 2,
          min: 0,
          max: 100,
          plotLines: [
            {
              value: 30,
              color: 'green',
              dashStyle: 'shortdash',
              width: 1,
              label: {
                text: 'Oversold',
              },
            },
            {
              value: 70,
              color: 'red',
              dashStyle: 'shortdash',
              width: 1,
              label: {
                text: 'Overbought',
              },
            },
          ],
        },
        {
          labels: {
            align: 'right',
            x: -3,
          },
          title: {
            text: 'MACD',
          },
          top: '85%',
          height: '15%',
          offset: 0,
          lineWidth: 2,
        },
      ],

      tooltip: {
        split: true,
        valueDecimals: 2,
      },

      series: [
        {
          type: 'candlestick',
          name: symbol,
          data: candlestickData,
          id: 'main',
          upColor: '#4db379',
          upLineColor: '#4db379',
          color: '#db4d4d',
          lineColor: '#db4d4d',
        },
        {
          type: 'column',
          name: 'Volume',
          data: volumeData,
          yAxis: 1,
          color: '#6f86d6',
        },
        {
          type: 'line',
          name: 'RSI',
          data: rsiData,
          yAxis: 2,
          color: '#ff9800',
          lineWidth: 2,
        },
        {
          type: 'line',
          name: 'MACD',
          data: macdData,
          yAxis: 3,
          color: '#0088ff',
          lineWidth: 2,
        },
        {
          type: 'line',
          name: 'Signal',
          data: signalData,
          yAxis: 3,
          color: '#ff0000',
          lineWidth: 1,
          dashStyle: 'shortdash',
        },
        {
          type: 'column',
          name: 'Histogram',
          data: histogramData,
          yAxis: 3,
          color: '#aaaaaa',
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 800,
            },
            chartOptions: {
              rangeSelector: {
                inputEnabled: false,
              },
            },
          },
        ],
      },

      exporting: {
        enabled: true,
      },

      credits: {
        enabled: false,
      },
    }
  }, [
    symbol,
    candlestickData,
    volumeData,
    rsiData,
    macdData,
    signalData,
    histogramData,
  ])

  if (loading) {
    return <StockChartSkeleton />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center text-center p-4 h-full text-red-600">
        {error}
      </div>
    )
  }

  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex items-center justify-center text-center p-4 h-full">
        No chart data available
      </div>
    )
  }

  return (
    <div className="mt-4">
      <HighchartsWrapper
        options={options}
        constructorType={'stockChart'}
      />
    </div>
  )
}
