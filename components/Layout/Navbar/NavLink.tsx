import { getLocalizedURL } from '@/libs/linkLocalizer'
import { classNames } from '@/libs/utilities'
import Link from 'next/link'

interface INavLinkProps {
  href: string
  active: boolean
  children: React.ReactNode
  size: 'phone' | 'desktop'
}

type LinkStyle = {
  [key in INavLinkProps['size']]: LinkStyleOptions
}

type LinkStyleOptions = {
  active: string
  inactive: string
  default: string
}

const styles: LinkStyle = {
  'desktop': {
    active: "border-primary-500 text-gray-900",
    inactive: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
    default: "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
  },
  'phone': {
    active: "bg-primary-50 border-primary-500 text-primary-700",
    inactive: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
    default: "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
  },
}

const NavLink = ({ href, active, children, size }: INavLinkProps) => {
  return (
    <Link
      href={getLocalizedURL(href)}
      className={classNames(
        active ? styles[size].active : styles[size].inactive,
        styles[size].default
      )}
    >
      {children}
    </Link>
  )
}

export default NavLink