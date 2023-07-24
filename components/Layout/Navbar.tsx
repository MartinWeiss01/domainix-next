'use client'
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { XMarkIcon, Cog6ToothIcon, Bars3Icon } from "@heroicons/react/24/outline"
import { Fragment } from "react"
import { classNames } from "@/libs/utilities"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ITranslationsNavbar } from "@/types/translations"
import { i18n, Locale } from "@/i18n-config"
import { changeURLLanguage, getLocalizedURL, getPathnameWithoutLanguage } from "@/libs/linkLocalizer"

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
  locale
}: {
  translations: ITranslationsNavbar,
  locale: Locale
}) => {
  const pathname = usePathname()

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
                    <Link
                      href={getLocalizedURL(link.href)}
                      key={link.name}
                      className={
                        classNames(
                          link.onlyExact ? (
                            link.href === getPathnameWithoutLanguage(pathname) ? "border-primary-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                          ) : (
                            getPathnameWithoutLanguage(pathname).includes(link.href) ? "border-primary-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                          ),
                          "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                        )
                      }>
                      {translations.links[link.translationId]}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Menu as="div" className="ml-3 relative z-10">
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
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700",
                                )}
                              >
                                {translations.vatInclude}
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700",
                                )}
                              >
                                {translations.vatValue}
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
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
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navlinks.map(link => (
                <Link
                  href={getLocalizedURL(link.href)}
                  key={link.name}
                  className={
                    classNames(
                      link.onlyExact ? (
                        link.href === getPathnameWithoutLanguage(pathname) ? "bg-primary-50 border-primary-500 text-primary-700" : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                      ) : (
                        getPathnameWithoutLanguage(pathname).includes(link.href) ? "bg-primary-50 border-primary-500 text-primary-700" : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                      ),
                      "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    )
                  }>
                  {translations.links[link.translationId]}
                </Link>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="">
                  <div className="text-base font-medium text-gray-800">{translations.settigs}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <div
                  className="flex justify-between px-4 py-2 text-base font-medium text-gray-500"
                >
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
                <a
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  {translations.vatInclude}
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  {translations.vatValue}
                </a>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar