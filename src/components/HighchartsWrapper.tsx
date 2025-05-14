'use client'

import {useEffect, useState, useRef} from 'react'

export default function HighchartsWrapper({
  options,
  constructorType = 'chart',
}) {
  const chartRef = useRef(null)
  const [HighchartsReact, setHighchartsReact] = useState(null)
  const [Highcharts, setHighcharts] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadHighcharts() {
      try {
        const highchartsModule = await import('highcharts/highstock')
        const reactModule = await import('highcharts-react-official')

        const HC = highchartsModule.default || highchartsModule
        const HCR = reactModule.default

        try {
          const indicatorsCore = await import(
            'highcharts/indicators/indicators'
          )
          const indicatorRSI = await import(
            'highcharts/indicators/rsi'
          )
          const indicatorMACD = await import(
            'highcharts/indicators/macd'
          )
          const volumeByPrice = await import(
            'highcharts/indicators/volume-by-price'
          )
          const hollowCandlestick = await import(
            'highcharts/modules/hollowcandlestick'
          )
          const dragPanes = await import(
            'highcharts/modules/drag-panes'
          )
          const annotations = await import(
            'highcharts/modules/annotations-advanced'
          )
          const priceIndicator = await import(
            'highcharts/modules/price-indicator'
          )
          const fullScreen = await import(
            'highcharts/modules/full-screen'
          )
          const stockTools = await import(
            'highcharts/modules/stock-tools'
          )

          if (indicatorsCore.default) indicatorsCore.default(HC)
          if (indicatorRSI.default) indicatorRSI.default(HC)
          if (indicatorMACD.default) indicatorMACD.default(HC)
          if (volumeByPrice.default) volumeByPrice.default(HC)
          if (hollowCandlestick.default) hollowCandlestick.default(HC)
          if (dragPanes.default) dragPanes.default(HC)
          if (annotations.default) annotations.default(HC)
          if (priceIndicator.default) priceIndicator.default(HC)
          if (fullScreen.default) fullScreen.default(HC)
          if (stockTools.default) stockTools.default(HC)
        } catch (e) {
          console.error('Error initializing Highcharts modules:', e)
        }

        if (isMounted) {
          setHighcharts(HC)
          setHighchartsReact(HCR)
          setIsLoaded(true)
        }
      } catch (error) {
        console.error('Failed to load Highcharts:', error)
        if (isMounted) {
          setError(error.message)
        }
      }
    }

    loadHighcharts()

    return () => {
      isMounted = false
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.destroy()
      }
    }
  }, [])

  if (error) {
    return (
      <div className="h-[682px] flex items-center justify-center text-red-500">
        Error loading chart: {error}
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="h-[682px] flex items-center justify-center">
        Loading chart...
      </div>
    )
  }

  return (
    <HighchartsReact
      ref={chartRef}
      highcharts={Highcharts}
      constructorType={constructorType}
      options={options}
    />
  )
}
