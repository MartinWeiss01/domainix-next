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

const ControlButton = ({ onClick, disabled, children }: { onClick: () => void, disabled: boolean, children: React.ReactNode }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={classNames(
      "flex mt-1 py-1 px-3 gap-x-2 items-center rounded text-sm font-medium text-gray-500 border-t-2 border-transparent transition-colors",
      disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:bg-gray-100"
    )}
  >
    {children}
  </button>
)

const Pagination = ({ currentPage, nextPage, previousPage, goToPage, isFirstPage, isLastPage, totalPages, previousText, nextText }: IPagination) => {
  const visiblePages = () => {
    const pages = []
    for (let i = Math.max(currentPage - VISIBLE_PAGE_RANGE, 0); i < Math.min(currentPage + VISIBLE_PAGE_RANGE, totalPages); i++) {
      pages.push(
        <li
          key={i}
          onClick={() => { currentPage !== i && goToPage(i) }}
          className={classNames(
            "border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium transition-colors",
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
      <ControlButton onClick={previousPage} disabled={isFirstPage}>
        <ArrowLongLeftIcon className="h-5 w-5" aria-hidden="true" />
        {previousText}
      </ControlButton>

      <ul className="hidden md:-mt-px md:flex">
        {visiblePages()}
      </ul>

      <ControlButton onClick={nextPage} disabled={isLastPage}>
        {nextText}
        <ArrowLongRightIcon className="h-5 w-5" aria-hidden="true" />
      </ControlButton>
    </nav>
  )
}

export default Pagination