'use client'

import { useCart } from "@/store/cart"
import CartItem from "./Cart/Item"
import CartPlaceholder from "./Cart/Placeholder"
import { ITranslationsCart } from "@/types/translations"
import { useVAT } from "@/store/vat"
import { calculatePrice } from "@/libs/utilities"

const Cart = ({ translations }: { translations: ITranslationsCart }) => {
  const { domains } = useCart()
  const { vat, includeVAT } = useVAT()

  if (domains.length !== 0) {
    const totalPrice = domains.reduce((acc, el) => acc + (el.detail.priceReg + ((el.years - 1) * el.detail.priceRen)), 0)
    return (
      <div className="p-6 sticky top-0">
        <h2 className="font-bold text-2xl">{translations.title}</h2>
        <div className="flex flex-col space-y-6 mt-2">
          {domains.map((el, key) => (
            <CartItem key={key} item={el} currency={translations.currencyCZK} translations={translations.item} />
          ))}

          <div className="border-t pt-6 flex justify-between">
            <span className="font-semibold text-gray-400">{translations.priceTotal}</span>
            <span className="font-semibold">
              {calculatePrice(totalPrice, includeVAT, vat)} {translations.currencyCZK}
            </span>
          </div>
        </div>

      </div>
    )
  }
  else return (
    <div className="p-6 sticky top-0">
      <h2 className="font-bold text-2xl">{translations.title}</h2>
      <div className="flex flex-col justify-center items-center">
        <CartPlaceholder className="h-64 w-64" />
        <span className="font-semibold text-gray-800">
          {translations.emptyTitle}
        </span>
        <span className="text-center text-xs text-gray-400">
          {translations.emptyDescription}
        </span>
      </div>
    </div>
  )
}

export default Cart
