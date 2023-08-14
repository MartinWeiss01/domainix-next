import { classNames } from "@/libs/utilities";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";

interface IPagination {
  currentPage: number;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (page: number) => void;
  isFirstPage: boolean;
  isLastPage: boolean;
  totalPages: number;
  previousText: string;
  nextText: string;
}

const VISIBLE_PAGE_RANGE = 5

const Pagination = ({ currentPage, nextPage, previousPage, goToPage, isFirstPage, isLastPage, totalPages, previousText, nextText }: IPagination) => {
  const visiblePages = () => {
    const pages = []
    for (let i = Math.max(currentPage - VISIBLE_PAGE_RANGE, 0); i < Math.min(currentPage + VISIBLE_PAGE_RANGE, totalPages); i++) {
      pages.push(
        <li
          key={i}
          onClick={() => { currentPage !== i && goToPage(i) }}
          className={classNames(
            "border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium",
            currentPage === i ? "border-primary-500 text-primary-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer"
          )}
        >
          {i + 1}
        </li>
      )
    }
    return pages
  }

  return (
    <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 select-none">
      <span
        onClick={previousPage}
        className={classNames(
          "-mt-px flex border-t-2 border-transparent pt-4 pr-1 items-center text-sm font-medium text-gray-500",
          isFirstPage ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:text-gray-700 hover:border-gray-300"
        )}
      >
        <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        {previousText}
      </span>

      <ul className="hidden md:-mt-px md:flex">
        {visiblePages()}
      </ul>

      <span
        onClick={nextPage}
        className={classNames(
          "-mt-px flex justify-end border-t-2 border-transparent pt-4 pl-1 items-center text-sm font-medium text-gray-500",
          isLastPage ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:text-gray-700 hover:border-gray-300"
        )}
      >
        {nextText}
        <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
      </span>
    </nav>
  )
}

export default Pagination