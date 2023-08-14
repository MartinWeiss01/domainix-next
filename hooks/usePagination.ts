import { EstimationData } from "@/types/estimation";
import { useState } from "react";

const PAGE_ROWS_LIMIT: number = 5

const usePagination = (rows: EstimationData[]) => {
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = Math.ceil(rows.length / PAGE_ROWS_LIMIT)

  const nextPage = () => {
    goToPage(currentPage + 1)
  }

  const previousPage = () => {
    goToPage(currentPage - 1)
  }

  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(() => page)
    }
  }

  const startRow = currentPage * PAGE_ROWS_LIMIT;
  const endRow = Math.min(startRow + PAGE_ROWS_LIMIT, rows.length);

  return {
    currentPage,
    nextPage,
    previousPage,
    goToPage,
    isFirstPage: currentPage === 0,
    isLastPage: currentPage === (totalPages - 1),
    currentRows: rows.slice(startRow, endRow),
    totalPages
  }
}

export default usePagination;