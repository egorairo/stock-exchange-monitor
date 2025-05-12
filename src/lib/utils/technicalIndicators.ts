// lib/utils/technicalIndicators.ts

/**
 * Набор функций для расчета технических индикаторов фондового рынка
 */

/**
 * Расчет Relative Strength Index (RSI)
 *
 * RSI показывает силу тренда и вероятность его смены.
 * Значения выше 70 считаются зоной перекупленности (возможно падение цены)
 * Значения ниже 30 считаются зоной перепроданности (возможен рост цены)
 *
 * @param prices - Массив цен закрытия
 * @param period - Период для расчета (по умолчанию 14 дней)
 * @returns Массив значений RSI
 */
export function calculateRSI(
  prices: number[],
  period: number = 14
): number[] {
  // Проверка на достаточность данных
  if (prices.length < period + 1) {
    return Array(prices.length).fill(0)
  }

  // Вычисляем изменения цен (прирост или убыток)
  const changes: number[] = []
  for (let i = 1; i < prices.length; i++) {
    changes.push(prices[i] - prices[i - 1])
  }

  // Массив для хранения значений RSI
  const rsiValues: number[] = Array(period).fill(0)

  // Начальные средние значения для первого периода
  let avgGain = 0
  let avgLoss = 0

  // Вычисляем первые средние значения
  for (let i = 0; i < period; i++) {
    if (changes[i] > 0) {
      avgGain += changes[i] // Суммируем все положительные изменения
    } else {
      avgLoss += Math.abs(changes[i]) // Суммируем все отрицательные изменения (по модулю)
    }
  }

  // Находим средние значения за период
  avgGain /= period
  avgLoss /= period

  // Расчет первого значения RSI
  let rs = avgGain / (avgLoss === 0 ? 1 : avgLoss) // Отношение среднего прироста к среднему убытку
  let rsi = 100 - 100 / (1 + rs) // Формула RSI
  rsiValues.push(rsi)

  // Вычисляем остальные значения RSI
  for (let i = period; i < changes.length; i++) {
    const change = changes[i]

    // Определяем, прирост или убыток
    const gain = change > 0 ? change : 0
    const loss = change < 0 ? Math.abs(change) : 0

    // Сглаживание средних значений (экспоненциальное сглаживание)
    avgGain = (avgGain * (period - 1) + gain) / period
    avgLoss = (avgLoss * (period - 1) + loss) / period

    // Расчет RSI
    rs = avgGain / (avgLoss === 0 ? 1 : avgLoss)
    rsi = 100 - 100 / (1 + rs)
    rsiValues.push(rsi)
  }

  return rsiValues
}

/**
 * Расчет Moving Average Convergence Divergence (MACD)
 *
 * MACD - индикатор, показывающий соотношение между двумя скользящими средними
 * Состоит из трех компонентов:
 * 1. Линия MACD - разница между быстрой и медленной EMA
 * 2. Сигнальная линия - EMA от линии MACD
 * 3. Гистограмма - разница между линией MACD и сигнальной линией
 *
 * @param prices - Массив цен закрытия
 * @param fastPeriod - Короткий период EMA (по умолчанию 12)
 * @param slowPeriod - Длинный период EMA (по умолчанию 26)
 * @param signalPeriod - Период сигнальной линии (по умолчанию 9)
 * @returns Объект с массивами значений MACD, сигнальной линии и гистограммы
 */
export function calculateMACD(
  prices: number[],
  fastPeriod: number = 12,
  slowPeriod: number = 26,
  signalPeriod: number = 9
): {macd: number[]; signal: number[]; histogram: number[]} {
  // Вычисляем быструю и медленную EMA
  const fastEMA = calculateEMA(prices, fastPeriod)
  const slowEMA = calculateEMA(prices, slowPeriod)

  // Вычисляем линию MACD (разница между быстрой и медленной EMA)
  const macdLine: number[] = []

  for (let i = 0; i < prices.length; i++) {
    if (i < slowPeriod - 1) {
      // Недостаточно данных для медленной EMA
      macdLine.push(0)
    } else {
      macdLine.push(fastEMA[i] - slowEMA[i])
    }
  }

  // Вычисляем сигнальную линию (EMA от линии MACD)
  const signalLine = calculateEMA(macdLine, signalPeriod)

  // Вычисляем гистограмму (разница между линией MACD и сигнальной линией)
  const histogram: number[] = []

  for (let i = 0; i < macdLine.length; i++) {
    if (i < slowPeriod + signalPeriod - 2) {
      // Недостаточно данных для сигнальной линии
      histogram.push(0)
    } else {
      histogram.push(macdLine[i] - signalLine[i])
    }
  }

  return {
    macd: macdLine,
    signal: signalLine,
    histogram: histogram,
  }
}

/**
 * Расчет Exponential Moving Average (EMA)
 *
 * EMA - экспоненциальное скользящее среднее, придающее больший вес недавним ценам
 * и меньший вес старым ценам
 *
 * @param prices - Массив цен
 * @param period - Период для расчета EMA
 * @returns Массив значений EMA
 */
export function calculateEMA(
  prices: number[],
  period: number
): number[] {
  const ema: number[] = []

  // Множитель сглаживания
  const multiplier = 2 / (period + 1)

  // Для начала EMA используем простое скользящее среднее (SMA)
  let sum = 0
  for (let i = 0; i < period; i++) {
    sum += prices[i]
  }
  const sma = sum / period

  // Заполняем начальные позиции нулями (для них EMA не рассчитывается)
  for (let i = 0; i < period - 1; i++) {
    ema.push(0)
  }

  // Первое значение EMA равно SMA
  ema.push(sma)

  // Вычисляем оставшиеся значения EMA по формуле:
  // EMA(сегодня) = (Цена(сегодня) - EMA(вчера)) * множитель + EMA(вчера)
  for (let i = period; i < prices.length; i++) {
    const value = (prices[i] - ema[i - 1]) * multiplier + ema[i - 1]
    ema.push(value)
  }

  return ema
}
