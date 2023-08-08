'use client'

import { classNames } from "@/libs/utilities"
import { useCurrency } from "@/store/currency"
import { Currency } from "@/types/currenciesApiResponse"
import { Menu, Transition } from "@headlessui/react"
import { CurrencyEuroIcon } from "@heroicons/react/24/outline"
import { Fragment, useEffect } from "react"

const CurrencyMenu = ({ availableCurrencies }: { availableCurrencies: Currency[] }) => {
  const { currencies, selectedCurrency, setCurrencies, setSelectedCurrency } = useCurrency()

  useEffect(() => {
    if (
      selectedCurrency === null &&
      availableCurrencies.length > 0
    ) {
      setCurrencies(availableCurrencies)
      const defaultCurrency = availableCurrencies.find(currency => currency.name === "USD") || availableCurrencies[0]
      setSelectedCurrency(defaultCurrency)
    }
  }, [])

  if (selectedCurrency !== null) return (
    <Menu as="div" className="ml-3 relative z-10">
      {({ open }) => (
        <>
          <Menu.Button className="max-w-xs py-1 px-2 flex items-center text-slate-600 rounded-full hover:text-primary-900 hover:bg-primary-400 hover:bg-opacity-10 focus:outline-none space-x-1">
            <CurrencyEuroIcon className="h-6 w-6 transition-all duration-1000" />
            <span className="font-semibold text-sm">
              {selectedCurrency?.name}
            </span>
          </Menu.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {currencies.map(currency => (
                <Menu.Item key={currency.name}>
                  <div
                    className={classNames(
                      "flex px-4 py-2 text-sm text-gray-700",
                      currency.name === selectedCurrency?.name ? "bg-primary-500 text-white font-bold" : "hover:bg-gray-100"
                    )}
                    onClick={() => setSelectedCurrency(currency)}
                  >
                    <span>{currency.name}</span>
                  </div>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
  else return null
}

export default CurrencyMenu