'use client'

import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const maxPagesToShow = 5
    const pages = []

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, 4)
      }

      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3)
      }

      if (startPage > 2) {
        pages.push('...')
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      if (endPage < totalPages - 1) {
        pages.push('...')
      }

      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex justify-center mt-6">
      <nav
        aria-label="Pagination"
        className="flex items-center space-x-1"
      >
        <button
          onClick={() =>
            currentPage > 1 && onPageChange(currentPage - 1)
          }
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded transition-colors ${
            currentPage === 1
              ? 'text-neutral-400 cursor-not-allowed'
              : 'text-primary hover:bg-neutral-800 cursor-pointer'
          }`}
          aria-label="Previous page"
        >
          ←
        </button>

        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-2 py-1 text-neutral-400">...</span>
            ) : (
              <button
                onClick={() =>
                  typeof page === 'number' && onPageChange(page)
                }
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'hover:bg-neutral-800'
                }`}
                aria-current={
                  currentPage === page ? 'page' : undefined
                }
                aria-label={`Page ${page}`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        <button
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded transition-colors ${
            currentPage === totalPages
              ? 'text-neutral-400 cursor-not-allowed'
              : 'text-primary hover:bg-neutral-800 cursor-pointer'
          }`}
          aria-label="Next page"
        >
          →
        </button>
      </nav>
    </div>
  )
}
