'use client'

import usePagination from "@/hooks/usePagination";
import { getLocalizedURL } from "@/libs/linkLocalizer";
import { calculatePrice, convertPriceCurrency } from "@/libs/utilities";
import { useCart } from "@/store/cart"
import { useCurrency } from "@/store/currency";
import { useVAT } from "@/store/vat";
import { EstimationData } from "@/types/estimation"
import { ITranslationsTable } from "@/types/translations";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Pagination from "../Pagination";

interface TableProps {
  estimationData: EstimationData[]
  processing: boolean
  domainName: string
  years: number
  translations: ITranslationsTable
}

const Table = ({ estimationData, processing, domainName, years, translations }: TableProps) => {
  const { addDomain } = useCart()
  const { vat, includeVAT } = useVAT()
  const { getSelectedCurrency, currencies } = useCurrency()
  const selectedCurrency = getSelectedCurrency().name
  const { currentPage, nextPage, previousPage, goToPage, isFirstPage, isLastPage, currentRows, totalPages } = usePagination(estimationData)

  const handleAddToCart = (estimationEl: EstimationData) => {
    addDomain({
      ...estimationEl,
      selectedDomain: domainName,
      years: years
    })
  }

  return (
    <section className="flex flex-col">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 relative">
          <thead className="bg-gray-50 sticky top-0">
            <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
              <th className="hidden sm:flex">{/* Registrar Logo Column */}</th>

              {/* Domain Name Column */}
              <th className="px-6 py-3 font-medium" scope="col">
                {translations.colDomain}
              </th>

              {/* Registration Price Column */}
              <th className="px-6 py-3 font-medium" scope="col">
                <div className="flex flex-col">
                  {translations.colRegPrice}
                  <small>{translations.priceDuration}</small>
                </div>
              </th>

              {/* Renewal Price Column */}
              <th className="px-6 py-3 font-medium" scope="col">
                <div className="flex flex-col">
                  {translations.colRenPrice}
                  <small>{translations.priceDuration}</small>
                </div>
              </th>

              {/* Total Price Column */}
              <th className="px-6 py-3 font-medium" scope="col">
                {translations.colTotalPrice}
              </th>

              <th className="px-6 py-3 text-right font-medium" scope="col">
                <span className="sr-only">{translations.colAddToCart}</span>
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {currentRows.map(el => {
              const prepareTotalPrice = (el.detail.priceReg + (years - 1) * el.detail.priceRen)
              const regPrice = calculatePrice(convertPriceCurrency(el.detail.priceReg, el.registrar.currency, selectedCurrency, currencies), includeVAT, vat)
              const renPrice = calculatePrice(convertPriceCurrency(el.detail.priceRen, el.registrar.currency, selectedCurrency, currencies), includeVAT, vat)
              const totalPrice = calculatePrice(convertPriceCurrency(prepareTotalPrice, el.registrar.currency, selectedCurrency, currencies), includeVAT, vat)
              const regPriceOriginal = calculatePrice(el.detail.priceReg, includeVAT, vat)
              const renPriceOriginal = calculatePrice(el.detail.priceRen, includeVAT, vat)
              const totalPriceOriginal = calculatePrice(prepareTotalPrice, includeVAT, vat)

              return (
                <tr key={el.registrar.id}>
                  {/* Registrar Logo Column */}
                  <td className="hidden px-6 sm:flex">
                    <div title={`${el.registrar.name} (${new Date(el.date).toLocaleDateString()})`} className="flex-shrink-0 h-16 w-16">
                      <Link href={getLocalizedURL(`/registrars/${el.registrar.slug}`)}>
                        <img
                          className="object-scale-down object-center h-16 w-16"
                          src={el.registrar.img}
                          alt={el.registrar.name}
                        />
                      </Link>
                    </div>
                  </td>

                  {/* Domain Name Column */}
                  <td className="px-6 py-4 max-w-[255px] break-words">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-900">{domainName}{el.detail.domain}</span>
                      <Link href={getLocalizedURL(`/registrars/${el.registrar.slug}`)}>
                        <span className="text-sm text-primary-600 hover:text-primary-900">{el.registrar.name}</span>
                      </Link>
                    </div>
                  </td>

                  {/* Registration Price Column */}
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-col">
                      <span>{regPrice} {translations[`currency${selectedCurrency}`]}</span>
                      {el.registrar.currency !== selectedCurrency && <small>{regPriceOriginal} {translations[`currency${el.registrar.currency}`]}</small>}
                    </div>
                  </td>

                  {/* Renewal Price Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-col">
                      <span>{renPrice} {translations[`currency${selectedCurrency}`]}</span>
                      {el.registrar.currency !== selectedCurrency && <small>{renPriceOriginal} {translations[`currency${el.registrar.currency}`]}</small>}
                    </div>
                  </td>

                  {/* Total Price Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-col">
                      <span>{totalPrice} {translations[`currency${selectedCurrency}`]}</span>
                      {el.registrar.currency !== selectedCurrency && <small>{totalPriceOriginal} {translations[`currency${el.registrar.currency}`]}</small>}
                    </div>
                  </td>

                  {/* Add to Cart Column */}
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button onClick={() => handleAddToCart(el)} className="text-primary-600 hover:text-primary-900">
                      <PlusIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        goToPage={goToPage}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        nextPage={nextPage}
        previousPage={previousPage}
        totalPages={totalPages}
        nextText={translations.paginationNext}
        previousText={translations.paginationPrevious}
      />
    </section>
  )
}

export default Table