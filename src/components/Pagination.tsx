'use client'

import React from 'react'
import ReactPaginate from 'react-paginate'

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
  const handlePageChange = (selectedItem: {selected: number}) => {
    onPageChange(selectedItem.selected + 1)
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex justify-center mt-6">
      <ReactPaginate
        previousLabel={'←'}
        nextLabel={'→'}
        breakLabel={'...'}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageChange}
        forcePage={currentPage - 1}
        containerClassName={'flex items-center space-x-1'}
        pageClassName={
          'px-3 py-1 rounded hover:bg-blue-100 cursor-pointer'
        }
        previousClassName={
          'px-3 py-1 rounded hover:bg-blue-100 cursor-pointer'
        }
        nextClassName={
          'px-3 py-1 rounded hover:bg-blue-100 cursor-pointer'
        }
        breakClassName={'px-3 py-1'}
        activeClassName={'bg-blue-600 text-white hover:bg-blue-600'}
        disabledClassName={
          'text-gray-400 cursor-not-allowed hover:bg-transparent'
        }
        previousLinkClassName={
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-blue-600'
        }
        nextLinkClassName={
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-blue-600'
        }
      />
    </div>
  )
}
