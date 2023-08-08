'use client'
import { Menu, Transition } from '@headlessui/react'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import SettingsItemContainer from './Settings/Layout'
import LanguageSelect from './Settings/LanguageSelect'
import VATSwitch from './Settings/VATSwitch'
import VATValue from './Settings/VATValue'
import { ITranslationsNavbar } from '@/types/translations'
import { Locale } from '@/i18n-config'

interface SettingsMenuProps {
  translations: ITranslationsNavbar
  locale: Locale
}

const SettingsMenu = ({ translations, locale }: SettingsMenuProps) => {
  return (
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
                <SettingsItemContainer name={translations.language} size="desktop">
                  <LanguageSelect locale={locale} size="desktop" />
                </SettingsItemContainer>
              </Menu.Item>

              <Menu.Item>
                <SettingsItemContainer name={translations.vatInclude} size="desktop">
                  <VATSwitch />
                </SettingsItemContainer>
              </Menu.Item>

              <Menu.Item disabled>
                <SettingsItemContainer name={translations.vatValue} size="desktop">
                  <VATValue />
                </SettingsItemContainer>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default SettingsMenu