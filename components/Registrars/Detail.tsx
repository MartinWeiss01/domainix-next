'use client'

import { calculatePrice, convertPriceCurrency } from "@/libs/utilities"
import { useCurrency } from "@/store/currency"
import { useVAT } from "@/store/vat"
import { CurrencyEnum, ObjectStructure } from "@/types/apiResponse"
import { ITranslationsDetail } from "@/types/translations"

interface RegistrarDetailProps {
  data: ObjectStructure
  translations: ITranslationsDetail
  defaultCurrency: CurrencyEnum
}

const RegistrarDetail = ({ data, translations, defaultCurrency }: RegistrarDetailProps) => {
  const { vat, includeVAT } = useVAT()
  const { getSelectedCurrency, currencies } = useCurrency()
  const selectedCurrency = getSelectedCurrency().name

  return (
    <>
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-4">{translations.title}</h2>
      <div className="overflow-x-auto max-h-96">
        <table className="min-w-full divide-y divide-gray-200 bg-gray-50 relative">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {translations.colTld}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {translations.colRegPrice}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {translations.colRenPrice}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.domains?.map(domain => {
              const regPriceOriginal = calculatePrice(domain.priceReg, includeVAT, vat)
              const regPrice = calculatePrice(convertPriceCurrency(domain.priceReg, defaultCurrency, selectedCurrency, currencies), includeVAT, vat)
              const renPriceOriginal = calculatePrice(domain.priceRen, includeVAT, vat)
              const renPrice = calculatePrice(convertPriceCurrency(domain.priceRen, defaultCurrency, selectedCurrency, currencies), includeVAT, vat)
              return (
                <tr key={domain.domain}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">{domain.domain}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-col">
                      <span>
                        {regPrice} {translations[`currency${selectedCurrency}`]}{translations.priceDuration}
                      </span>
                      {defaultCurrency !== selectedCurrency &&
                        <small>
                          {regPriceOriginal} {translations[`currency${defaultCurrency}`]}{translations.priceDuration}
                        </small>
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-col">
                      <span>
                        {renPrice} {translations[`currency${selectedCurrency}`]}{translations.priceDuration}
                      </span>
                      {defaultCurrency !== selectedCurrency &&
                        <small>
                          {renPriceOriginal} {translations[`currency${defaultCurrency}`]}{translations.priceDuration}
                        </small>
                      }
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default RegistrarDetail