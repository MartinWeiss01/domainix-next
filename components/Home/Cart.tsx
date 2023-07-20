'use client'

import { useCart } from "@/store/cart"
import CartItem from "./Cart/Item"
import CartPlaceholder from "./Cart/Placeholder"

const Cart = () => {
  const { domains } = useCart()

  if (domains.length !== 0) return (
    <div className="p-6 sticky top-0">
      <h2 className="font-bold text-2xl">Summary</h2>
      <div className="flex flex-col space-y-6 mt-2">
        {domains.map((el, key) => (
          <CartItem key={key} item={el} />
        ))}

        <div className="border-t pt-6 flex justify-between">
          <span className="font-semibold text-gray-400">Total</span>
          <span className="font-semibold">
            {domains.reduce((acc, el) => acc + (el.detail.priceReg + ((el.years - 1) * el.detail.priceRen)), 0)} Kč
          </span>
        </div>
      </div>

    </div>
  )
  else return (
    <div className="p-6 sticky top-0">
      <h2 className="font-bold text-2xl">Summary</h2>
      <div className="flex flex-col justify-center items-center">
        <CartPlaceholder className="h-64 w-64" />
        <span className="font-semibold text-gray-800">
          There are no domains yet.
        </span>
        <span className="text-center text-xs text-gray-400">
          Please add some domains to the cart.
        </span>
      </div>
    </div>
  )
}

export default Cart
