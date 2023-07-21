'use client'
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { XMarkIcon, Cog6ToothIcon, Bars3Icon } from "@heroicons/react/24/outline"
import { Fragment } from "react"
import { classNames } from "@/libs/utilities"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface INavLink {
  name: string
  href: string
  onlyExact: boolean
}

const navlinks: INavLink[] = [
  {
    name: "Home",
    href: "/",
    onlyExact: true
  },
  {
    name: "Registrars",
    href: "/registrars",
    onlyExact: false
  },
]

const Navbar = () => {
  const pathname = usePathname()

  return (
    <Disclosure as="nav" className="flex-shrink-0 bg-white border-b border-gray-200">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src="/img/logo-small.svg"
                      alt="Workflow"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src="/img/logo.svg"
                      alt="Workflow"
                    />
                  </Link>
                </div>

                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {navlinks.map(link => (
                    <Link
                      href={link.href}
                      key={link.name}
                      className={
                        classNames(
                          link.onlyExact ? (
                            link.href === pathname ? "border-primary-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                          ) : (
                            pathname.includes(link.href) ? "border-primary-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                          ),
                          "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                        )
                      }>
                      {link.name}
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
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700",
                                )}
                              >
                                Language TODO
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
                                VAT Switch TODO
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
                                VAT Value TODO
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
                  <span className="sr-only">Open main menu</span>
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
                  href={link.href}
                  key={link.name}
                  className={
                    classNames(
                      link.onlyExact ? (
                        link.href === pathname ? "bg-primary-50 border-primary-500 text-primary-700" : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                      ) : (
                        pathname.includes(link.href) ? "bg-primary-50 border-primary-500 text-primary-700" : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                      ),
                      "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    )
                  }>
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="">
                  <div className="text-base font-medium text-gray-800">Settings</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Language TODO
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  VAT Switch TODO
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  VAT Value TODO
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