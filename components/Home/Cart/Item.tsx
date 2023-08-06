'use client'
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline"
import { useCart } from "@/store/cart"
import { CartData } from "@/types/cart"
import { ITranslationsItem } from "@/types/translations"
import { calculatePrice } from "@/libs/utilities"
import { useVAT } from "@/store/vat"
import { useCurrency } from "@/store/currency"

const CartItem = ({
  item,
  currency,
  translations
}: {
  item: CartData,
  currency: string,
  translations: ITranslationsItem
}) => {
  const { increaseYear, removeDomain } = useCart()
  const { includeVAT, vat } = useVAT()
  const { convertPrice } = useCurrency()

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex justify-between items-start">
        <span className="font-semibold truncate w-full">
          {item.selectedDomain}{item.detail.domain}
        </span>

        <button onClick={() => removeDomain(item)}>
          <XMarkIcon className="h-5 w-5 text-black hover:text-red-800 transition-colors" />
        </button>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col">
          <small>{item.registrar.name}</small>
          <small>
            {calculatePrice(convertPrice((item.detail.priceReg + (item.years - 1) * item.detail.priceRen), item.registrar.currency), includeVAT, vat)} {currency}
          </small>
        </div>

        <div className="flex flex-col items-center">
          <div className="border flex items-center p-1">
            <button
              type="button"
              onClick={() => increaseYear(item, -1)}
              className="w-6 h-6 flex items-center justify-center text-black hover:text-primary-600 transition-colors">
              <MinusIcon className="h-4 w-4" aria-hidden="true" />
            </button>

            <small className="px-2 font-semibold uppercase text-xs">
              {item.years} {
                item.years < 5 ?
                  item.years > 1 ? translations.pluralFew : translations.pluralOne
                  : translations.pluralOther
              }
            </small>

            <button
              onClick={() => increaseYear(item, +1)}
              className="w-6 h-6 flex items-center justify-center text-black hover:text-primary-600 transition-colors">
              <PlusIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem