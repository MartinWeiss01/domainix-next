//import 'server-only'
import { Locale, i18n } from "@/i18n-config"
import Link from "next/link"
import { changeURLLanguage } from "@/libs/linkLocalizer"
import { classNames } from '@/libs/utilities'

interface ISelectProps {
  locale: Locale
  size: 'phone' | 'desktop'
}

type OptionStyle = {
  [key in ISelectProps['size']]: OptionStyleDetails
}

type OptionStyleDetails = {
  sizes: string
}

const styles: OptionStyle = {
  'desktop': { sizes: "h-5 w-5" },
  'phone': { sizes: "h-6 w-6" },
}

const LanguageSelect = ({ locale, size }: ISelectProps) => {
  return (
    <>
      {i18n.navbar.map(lang => (
        <Link
          href={changeURLLanguage(lang.id)}
          key={lang.id}
        >
          <div className={classNames("relative", styles[size].sizes)}>
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
    </>
  )
}

export default LanguageSelect