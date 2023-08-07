'use client'

import Cart from "@/components/Home/Cart"
import { classNames } from "@/libs/utilities"
import { ITranslationsCart } from "@/types/translations"
import { Popover, Transition } from "@headlessui/react"
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline"
import { Fragment } from "react"


const CartMenu = ({ cartTranslations }: { cartTranslations: ITranslationsCart }) => {
  return (
    <Popover className="lg:hidden">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              "group max-w-xs p-1 bg-white flex items-center text-sm text-slate-600 rounded-full hover:text-primary-900 hover:bg-primary-400 hover:bg-opacity-10 focus:outline-none",
              open && "hover:text-primary-900 hover:bg-primary-400 hover:bg-opacity-10"
            )}
          >
            <ClipboardDocumentListIcon className="h-6 w-6 transition-all duration-1000" />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-lg shadow-xl ring-1 ring-gray-300 bg-gray-50 px-4 py-2">
                <Cart translations={cartTranslations} />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default CartMenu