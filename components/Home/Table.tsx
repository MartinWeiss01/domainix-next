'use client'

import { getLocalizedURL } from "@/libs/linkLocalizer";
import { calculatePrice } from "@/libs/utilities";
import { useCart } from "@/store/cart"
import { useCurrency } from "@/store/currency";
import { useVAT } from "@/store/vat";
import { EstimationData } from "@/types/estimation"
import { ITranslationsTable } from "@/types/translations";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

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
  const { selectedCurrency, convertPrice } = useCurrency()

  const handleAddToCart = (estimationEl: EstimationData) => {
    addDomain({
      ...estimationEl,
      selectedDomain: domainName,
      years: years
    })
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-x-auto max-h-[420px] rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 relative">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th
                    scope="col"
                    className=""
                  >
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {translations.colDomain}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex flex-col">
                      {translations.colRegPrice}
                      <small>
                        {translations.priceDuration}
                      </small>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex flex-col">

                      {translations.colRenPrice}
                      <small>
                        {translations.priceDuration}
                      </small>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {translations.colTotalPrice}
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <span className="sr-only">{translations.colAddToCart}</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {estimationData.map(el => {
                  const prepareTotalPrice = (el.detail.priceReg + (years - 1) * el.detail.priceRen)
                  const regPrice = calculatePrice(convertPrice(el.detail.priceReg, el.registrar.currency), includeVAT, vat)
                  const renPrice = calculatePrice(convertPrice(el.detail.priceRen, el.registrar.currency), includeVAT, vat)
                  const totalPrice = calculatePrice(convertPrice(prepareTotalPrice, el.registrar.currency), includeVAT, vat)
                  const regPriceOriginal = calculatePrice(el.detail.priceReg, includeVAT, vat)
                  const renPriceOriginal = calculatePrice(el.detail.priceRen, includeVAT, vat)
                  const totalPriceOriginal = calculatePrice(prepareTotalPrice, includeVAT, vat)

                  return (
                    <tr key={el.registrar.id}>
                      <td className="px-6 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            title={`${el.registrar.name} (${new Date(el.date).toLocaleDateString()})`}
                            className="flex-shrink-0 h-16 w-16"
                          >
                            <Link href={getLocalizedURL(`/registrars/${el.registrar.slug}`)}>
                              <img
                                className="object-scale-down object-center h-16 w-16"
                                src={el.registrar.img}
                                alt={el.registrar.name}
                              />
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{domainName}{el.detail.domain}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex flex-col">
                          <span>
                            {regPrice} {translations[`currency${selectedCurrency?.name}`]}
                          </span>
                          {el.registrar.currency !== selectedCurrency?.name &&
                            <small>
                              {regPriceOriginal} {translations[`currency${el.registrar.currency}`]}
                            </small>
                          }
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex flex-col">
                          <span>
                            {renPrice} {translations[`currency${selectedCurrency?.name}`]}
                          </span>
                          {el.registrar.currency !== selectedCurrency?.name &&
                            <small>
                              {renPriceOriginal} {translations[`currency${el.registrar.currency}`]}
                            </small>
                          }
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex flex-col">
                          <span>
                            {totalPrice} {translations[`currency${selectedCurrency?.name}`]}
                          </span>
                          {el.registrar.currency !== selectedCurrency?.name &&
                            <small>
                              {totalPriceOriginal} {translations[`currency${el.registrar.currency}`]}
                            </small>
                          }
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-primary-600 hover:text-primary-900">
                          <button onClick={() => handleAddToCart(el)}>
                            <PlusIcon className="h-5 w-5" />
                          </button>
                        </a>
                      </td>
                    </tr>
                  )
                }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table