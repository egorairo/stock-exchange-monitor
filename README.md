# Биржевой монитор

Web-приложение для отслеживания котировок акций в реальном времени с помощью [Alpha Vantage API](https://www.alphavantage.co/documentation/).

## Возможности

- Отображение списка акций с актуальными котировками
- Автообновление цен каждые 20 секунд
- Поиск по символу или названию акции
- Фильтры: Все / Растущие / Падающие
- Интерактивные свечные графики с индикаторами RSI и MACD
- Пагинация списка акций

## Технологии

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Highcharts
- React Paginate

## Моковые данные

> **Важно: Alpha Vantage API ограничен 25 запросами в день на бесплатном тарифе.**

Поэтому в проекте реализованы моковые данные:

- Автоматически используются при исчерпании лимита API
- Имитируют реальные биржевые котировки с волатильностью
- Позволяют тестировать все функции без ограничений

Чтобы переключаться между реальным API и моковыми данными, измените переменную `NEXT_PUBLIC_USE_MOCKS` в файле `.env.local`.

## Запуск проекта

1. Клонировать репозиторий:

```bash
git clone https://github.com/egorairo/stock-exchange-monitor.git
cd stock-exchange-monitor
```

2. Установить зависимости:

```bash
npm install
```

3. Получить [api_key](https://www.alphavantage.co/support/#api-key) для Alpha Vantage API

4. Создать .env.local:

```bash
NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=api_key
NEXT_PUBLIC_USE_MOCKS=true
```

5. Запустить:

```bash
npm run dev
```

6. Открыть http://localhost:3000
