'use client'

import {StockMonitor} from '@/components/StockMonitor'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center w-full">
        <StockMonitor />
      </main>
    </div>
  )
}
