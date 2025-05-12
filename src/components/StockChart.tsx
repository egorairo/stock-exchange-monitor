'use client'

import React, {useMemo} from 'react'
import {useStockChart} from '@/lib/hooks/useStockChart'
import {StockChartSkeleton} from './skeletons/StockChartSkeleton'
import dynamic from 'next/dynamic'
import Highcharts from 'highcharts'

const HighchartsWrapper = dynamic(
  () => import('./HighchartsWrapper'),
  {
    ssr: false,
    loading: () => <StockChartSkeleton />,
  }
)

interface StockChartProps {
  symbol: string
}

export const StockChart: React.FC<StockChartProps> = ({symbol}) => {
  const {chartData, loading, error} = useStockChart(symbol)

  const candlestickData = useMemo(() => {
    if (!chartData || chartData.length === 0) return []

    return chartData.map((point) => {
      const dateParts = point.date.split('/')
      const dateObj = new Date(
        parseInt(dateParts[2]),
        parseInt(dateParts[0]) - 1,
        parseInt(dateParts[1])
      )

      return [
        dateObj.getTime(),
        point.open || point.price,
        point.high || point.price,
        point.low || point.price,
        point.price,
      ]
    })
  }, [chartData])

  const volumeData = useMemo(() => {
    if (!chartData || chartData.length === 0) return []

    return chartData.map((point) => {
      const dateParts = point.date.split('/')
      const dateObj = new Date(
        parseInt(dateParts[2]),
        parseInt(dateParts[0]) - 1,
        parseInt(dateParts[1])
      )

      return [dateObj.getTime(), point.volume || 0]
    })
  }, [chartData])

  const options = useMemo(() => {
    return {
      chart: {
        height: 798,
        style: {
          fontFamily: 'Inter, system-ui, sans-serif',
        },
      },

      rangeSelector: {
        selected: 6,
        buttons: [
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
          {
            type: 'month',
            count: 3,
            text: '3m',
          },
          {
            type: 'month',
            count: 6,
            text: '6m',
          },
          {
            type: 'ytd',
            text: 'YTD',
          },
          {
            type: 'all',
            text: 'All',
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
        labels: {
          formatter: function () {
            return Highcharts.dateFormat('%b %e', this.value)
          },
        },
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
          dataGrouping: {
            units: [['day', [1]]],
          },
        },
        {
          type: 'column',
          name: 'Volume',
          data: volumeData,
          yAxis: 1,
          color: '#6f86d6',
          dataGrouping: {
            units: [['day', [1]]],
          },
        },
        {
          type: 'rsi',
          name: 'RSI',
          linkedTo: 'main',
          yAxis: 2,
          params: {
            period: 14,
          },
          color: '#ff9800',
          lineWidth: 2,
        },
        {
          type: 'macd',
          name: 'MACD',
          linkedTo: 'main',
          yAxis: 3,
          params: {
            shortPeriod: 12,
            longPeriod: 26,
            signalPeriod: 9,
          },
          macdLine: {
            styles: {
              lineColor: '#0088ff',
              lineWidth: 2,
            },
          },
          signalLine: {
            styles: {
              lineColor: '#ff0000',
              lineWidth: 1,
            },
          },
          threshold: {
            styles: {
              lineColor: '#aaaaaa',
              lineWidth: 1,
            },
          },
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
  }, [symbol, candlestickData, volumeData])

  if (loading) {
    return <StockChartSkeleton />
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-600 h-[760px]">
        {error}
      </div>
    )
  }

  if (!chartData || chartData.length === 0) {
    return (
      <div className="text-center p-4 h-[760px]">
        No chart data available
      </div>
    )
  }

  return (
    <div className="mt-8">
      <HighchartsWrapper
        options={options}
        constructorType={'stockChart'}
      />
    </div>
  )
}
