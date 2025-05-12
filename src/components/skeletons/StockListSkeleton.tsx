import React from 'react'

export const StockListSkeleton: React.FC = () => {
  return (
    <div className="w-full animate-pulse h-full">
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between gap-2">
        <div className="h-10 bg-neutral-800 border border-neutral-700 rounded w-full sm:w-64"></div>
        <div className="flex gap-2">
          <div className="h-10 w-16 bg-neutral-800 border border-neutral-700 rounded"></div>
          <div className="h-10 w-24 bg-neutral-800 border border-neutral-700 rounded"></div>
          <div className="h-10 w-24 bg-neutral-800 border border-neutral-700 rounded"></div>
        </div>
      </div>

      <div className="max-h-[540px] overflow-y-auto h-full">
        {Array.from({length: 10}).map((_, index) => (
          <div
            key={index}
            className="p-4 border-b border-neutral-700 flex justify-between items-center"
          >
            <div className="flex flex-col space-y-2">
              <div className="h-5 w-16 bg-neutral-800 rounded"></div>
              <div className="h-4 w-32 bg-neutral-800/70 rounded"></div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <div className="h-5 w-20 bg-neutral-800 rounded"></div>
              <div className="h-4 w-16 bg-neutral-800/70 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-between items-end h-full">
        <div className="flex gap-2">
          {Array.from({length: 3}).map((_, index) => (
            <div
              key={index}
              className="h-8 w-8 bg-neutral-800 rounded"
            ></div>
          ))}
        </div>
        <div className="flex items-center mt-2 sm:mt-0 gap-2">
          <div className="h-4 w-24 bg-neutral-800 rounded"></div>
          <div className="h-8 w-16 bg-neutral-800 border border-neutral-700 rounded"></div>
        </div>
      </div>
    </div>
  )
}
