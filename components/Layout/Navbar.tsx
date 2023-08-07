'use client'
import { Disclosure, Menu, Popover, Switch, Transition } from "@headlessui/react"
import { XMarkIcon, Cog6ToothIcon, Bars3Icon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline"
import { Fragment } from "react"
import { classNames } from "@/libs/utilities"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ITranslationsCart, ITranslationsNavbar } from "@/types/translations"
import { i18n, Locale } from "@/i18n-config"
import { changeURLLanguage, getLocalizedURL, getPathnameWithoutLanguage } from "@/libs/linkLocalizer"
import { useVAT } from "@/store/vat"
import Cart from "../Home/Cart"
import { Currency } from "@/types/currenciesApiResponse"
import NavLink from "./Navbar/NavLink"
import CurrencyMenu from "./Navbar/CurrencyMenu"
import CartMenu from "./Navbar/CartMenu"

interface INavLink {
  name: string
  href: string
  onlyExact: boolean
  translationId: string
}

const navlinks: INavLink[] = [
  {
    name: "Home",
    href: "/",
    onlyExact: true,
    translationId: "home"
  },
  {
    name: "Registrars",
    href: "/registrars",
    onlyExact: false,
    translationId: "registrars"
  },
]

const Navbar = ({
  translations,
  locale,
  cartTranslations,
  availableCurrencies
}: {
  translations: ITranslationsNavbar,
  locale: Locale,
  cartTranslations: ITranslationsCart,
  availableCurrencies: Currency[]
}) => {
  const pathname = usePathname()
  const { includeVAT, setIncludeVAT, vat, setVAT } = useVAT()

  return (
    <Disclosure as="nav" className="flex-shrink-0 bg-white border-b border-gray-200">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link href={getLocalizedURL("/")}>
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src="/img/logo-small.svg"
                      alt="Domainix"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src="/img/logo.svg"
                      alt="Domainix"
                    />
                  </Link>
                </div>

                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {navlinks.map(link => (
                    <NavLink
                      key={link.name}
                      href={link.href}
                      active={link.onlyExact ? link.href === getPathnameWithoutLanguage(pathname) : getPathnameWithoutLanguage(pathname).includes(link.href)}
                      size="desktop"
                    >
                      {translations.links[link.translationId]}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div className="sm:ml-6 flex items-center space-x-2">
                <CartMenu cartTranslations={cartTranslations} />
                <CurrencyMenu availableCurrencies={availableCurrencies} />

                <div className="flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    <span className="sr-only">{translations.menuOpen}</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <Menu as="div" className="hidden sm:block ml-3 relative z-10">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="group max-w-xs p-1 bg-white flex items-center text-sm text-slate-600 rounded-full hover:text-primary-900 hover:bg-primary-400 hover:bg-opacity-10 focus:outline-none">
                          <Cog6ToothIcon className="h-6 w-6 group-hover:rotate-180 group-active:rotate-180 transition-all duration-1000" />
                        </Menu.Button>
                      </div>
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
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <Menu.Item>
                            <div
                              className="flex justify-between items-center px-4 py-2 text-sm text-gray-700"
                            >
                              <span>{translations.language}</span>
                              <div className="flex space-x-2">
                                {i18n.navbar.map(lang => (
                                  <Link
                                    href={changeURLLanguage(lang.id)}
                                    key={lang.id}
                                  >
                                    <div className="relative h-5 w-5">
                                      <img
                                        src={lang.img}
                                        width="20"
                                        alt={lang.name}
                                        title={lang.name}
                                        className={classNames(
                                          "rounded-full cursor-pointer absolute inset-0 h-full w-full object-cover border-2",
                                          lang.id === locale && "border-primary-500"
                                        )}
                                      />
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </Menu.Item>
                          <Menu.Item>
                            <div
                              className="flex justify-between items-center px-4 py-2 text-sm text-gray-700"
                            >
                              <span>{translations.vatInclude}</span>
                              <div className="flex space-x-2">
                                <Switch
                                  checked={includeVAT}
                                  onChange={() => setIncludeVAT(!includeVAT)}
                                  className={`${includeVAT ? 'bg-primary-700' : 'bg-gray-300'} relative inline-flex flex-shrink-0 h-4 w-8 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                >
                                  <span aria-hidden="true" className={`${includeVAT ? 'translate-x-4' : 'translate-x-0'} pointer-events-none inline-block h-3 w-3 rounded-full bg-white transform ring-0 transition ease-in-out duration-200`} />
                                </Switch>
                              </div>
                            </div>
                          </Menu.Item>
                          <Menu.Item disabled>
                            <div
                              className="flex justify-between items-center px-4 py-2 text-sm text-gray-700"
                            >
                              <span>{translations.vatValue}</span>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="number"
                                  value={vat}
                                  onChange={e => setVAT(Number(e.target.value))}
                                  className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                />
                                <span>
                                  %
                                </span>
                              </div>
                            </div>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navlinks.map(link => (
                <NavLink
                  key={link.name}
                  href={link.href}
                  active={link.onlyExact ? link.href === getPathnameWithoutLanguage(pathname) : getPathnameWithoutLanguage(pathname).includes(link.href)}
                  size="phone"
                >
                  {translations.links[link.translationId]}
                </NavLink>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="">
                  <div className="text-base font-medium text-gray-800">{translations.settigs}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <div className="flex justify-between px-4 py-2 text-base font-medium text-gray-500">
                  <span>{translations.language}</span>
                  <div className="flex space-x-2">
                    {i18n.navbar.map(lang => (
                      <Link
                        href={changeURLLanguage(lang.id)}
                        key={lang.id}
                      >
                        <div className="relative h-6 w-6">
                          <img
                            src={lang.img}
                            width="20"
                            alt={lang.name}
                            title={lang.name}
                            className={classNames(
                              "rounded-full cursor-pointer absolute inset-0 h-full w-full object-cover border-2",
                              lang.id === locale && "border-primary-500"
                            )}
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>



                <div className="flex justify-between px-4 py-2 text-base font-medium text-gray-500">
                  <span>{translations.vatInclude}</span>
                  <div className="flex space-x-2">
                    <Switch
                      checked={includeVAT}
                      onChange={() => setIncludeVAT(!includeVAT)}
                      className={`${includeVAT ? 'bg-primary-700' : 'bg-gray-300'} relative inline-flex flex-shrink-0 h-4 w-8 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                      <span aria-hidden="true" className={`${includeVAT ? 'translate-x-4' : 'translate-x-0'} pointer-events-none inline-block h-3 w-3 rounded-full bg-white transform ring-0 transition ease-in-out duration-200`} />
                    </Switch>
                  </div>
                </div>



                <div className="flex justify-between px-4 py-2 text-base font-medium text-gray-500">
                  <span>{translations.vatValue}</span>
                  <div className="flex space-x-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={vat}
                        onChange={e => setVAT(Number(e.target.value))}
                        className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      />
                      <span>
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar