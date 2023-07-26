'use client'

import { calculatePrice } from "@/libs/utilities";
import { useCart } from "@/store/cart"
import { useVAT } from "@/store/vat";
import { EstimationData } from "@/types/estimation"
import { ITranslationsTable } from "@/types/translations";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {translations.colRegistrar}
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
                    {translations.colRegPrice}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {translations.colRenPrice}
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
                {estimationData.map(el => (
                  <tr key={el.registrar.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="object-scale-down object-center h-10 w-10 rounded-full"
                            src={el.registrar.img}
                            alt={el.registrar.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {el.registrar.name}
                          </div>
                          <small className="text-gray-500" title="Last Update">
                            {new Date(el.date).toLocaleDateString()}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{domainName}{el.detail.domain}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {calculatePrice(el.detail.priceReg, includeVAT, vat)} {translations.currencyCZK}{translations.priceDuration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {calculatePrice(el.detail.priceRen, includeVAT, vat)} {translations.currencyCZK}{translations.priceDuration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {calculatePrice(el.detail.priceReg + (years - 1) * el.detail.priceRen, includeVAT, vat)} {translations.currencyCZK}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        <button onClick={() => handleAddToCart(el)}>
                          <ShoppingCartIcon className="h-5 w-5" />
                        </button>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table