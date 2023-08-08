'use client'
import { Disclosure } from "@headlessui/react"
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ITranslationsCart, ITranslationsNavbar } from "@/types/translations"
import { Locale } from "@/i18n-config"
import { getLocalizedURL, getPathnameWithoutLanguage } from "@/libs/linkLocalizer"
import { Currency } from "@/types/currenciesApiResponse"
import NavLink from "./Navbar/NavLink"
import CurrencyMenu from "./Navbar/CurrencyMenu"
import CartMenu from "./Navbar/CartMenu"
import SettingsItemContainer from "./Navbar/Settings/Layout"
import LanguageSelect from "./Navbar/Settings/LanguageSelect"
import VATSwitch from "./Navbar/Settings/VATSwitch"
import VATValue from "./Navbar/Settings/VATValue"
import SettingsMenu from "./Navbar/SettingsMenu"

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

  return (
    <Disclosure as="nav" className="bg-white border-b border-gray-200">
      {({ open }) => (
        <>
          {/* Desktop */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16">
            {/* Left */}
            <div className="flex">
              {/* Logo */}
              <div className="flex items-center">
                <Link href={getLocalizedURL("/")}>
                  <img className="block lg:hidden h-8 w-auto" src="/img/logo-small.svg" alt="Domainix" />
                  <img className="hidden lg:block h-8 w-auto" src="/img/logo.svg" alt="Domainix" />
                </Link>
              </div>

              {/* Desktop Links */}
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

            {/* Right */}
            <div className="sm:ml-6 flex items-center space-x-2">
              <CartMenu cartTranslations={cartTranslations} />
              <CurrencyMenu availableCurrencies={availableCurrencies} />

              {/* Mobile menu button */}
              <div className="flex items-center sm:hidden">
                <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  <span className="sr-only">{translations.menuOpen}</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <SettingsMenu locale={locale} translations={translations} />
            </div>
          </div>

          {/* Mobile */}
          <Disclosure.Panel className="sm:hidden">
            {/* Mobile Links */}
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
            {/* Settings */}
            <div className="pt-4 pb-3 border-t border-gray-200">
              <span className="px-4 text-base font-medium text-gray-800">{translations.settigs}</span>

              <div className="mt-3 space-y-1">
                <SettingsItemContainer name={translations.language} size="phone">
                  <LanguageSelect locale={locale} size="phone" />
                </SettingsItemContainer>

                <SettingsItemContainer name={translations.vatInclude} size="phone">
                  <VATSwitch />
                </SettingsItemContainer>

                <SettingsItemContainer name={translations.vatValue} size="phone">
                  <VATValue />
                </SettingsItemContainer>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar