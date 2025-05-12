import React from 'react'

export const StockChartSkeleton: React.FC = () => {
  return (
    <div className="w-full h-[830px] animate-pulse">
      <div className="flex justify-between items-center mb-6">
        <div className="h-7 w-48 bg-neutral-800 rounded"></div>
        <div className="flex gap-3">
          <div className="h-8 w-8 bg-neutral-800 rounded"></div>
          <div className="h-8 w-8 bg-neutral-800 rounded"></div>
          <div className="h-8 w-8 bg-neutral-800 rounded"></div>
        </div>
      </div>

      <div className="relative h-[760px] w-full p-4 border border-neutral-700 rounded-lg bg-neutral-900/20">
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between py-6">
          <div className="h-4 w-10 bg-neutral-800 rounded"></div>
          <div className="h-4 w-8 bg-neutral-800 rounded"></div>
          <div className="h-4 w-10 bg-neutral-800 rounded"></div>
          <div className="h-4 w-8 bg-neutral-800 rounded"></div>
          <div className="h-4 w-10 bg-neutral-800 rounded"></div>
        </div>

        <div className="absolute left-12 right-0 top-0 bottom-0">
          {Array.from({length: 5}).map((_, index) => (
            <div
              key={`h-${index}`}
              className="absolute w-full h-px bg-neutral-800/50"
              style={{top: `${20 * (index + 1)}%`}}
            ></div>
          ))}

          <div
            className="absolute left-0 right-0 top-[30%] h-px bg-neutral-700"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)',
            }}
          ></div>

          <svg
            className="absolute inset-0 w-full h-[70%]"
            preserveAspectRatio="none"
          >
            <path
              d="M0,100 C50,80 90,120 200,70 C250,50 300,90 400,30 C450,20 500,50 600,40"
              fill="none"
              stroke="var(--neutral-600)"
              strokeWidth="2"
              strokeDasharray="4,4"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="absolute left-0 right-0 bottom-0 h-[20%] flex items-end justify-between px-4">
            {Array.from({length: 12}).map((_, index) => (
              <div
                key={`vol-${index}`}
                className="w-[4%] bg-neutral-700/50 rounded-t"
                style={{
                  height: `${Math.floor(30 + Math.random() * 70)}%`,
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="absolute left-12 right-0 bottom-0 h-6 flex justify-between px-4">
          {Array.from({length: 6}).map((_, index) => (
            <div
              key={`x-${index}`}
              className="h-4 w-16 bg-neutral-800 rounded"
            ></div>
          ))}
        </div>

        <div className="absolute right-4 top-4 flex flex-col gap-2 p-3 bg-neutral-800/20 border border-neutral-700/50 rounded">
          <div className="h-4 w-24 bg-neutral-800 rounded"></div>
          <div className="h-4 w-20 bg-neutral-800 rounded"></div>
          <div className="h-4 w-28 bg-neutral-800 rounded"></div>
        </div>
      </div>
    </div>
  )
}
