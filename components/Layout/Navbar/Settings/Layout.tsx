//import 'server-only'

import { classNames } from "@/libs/utilities"

interface IItemProps {
  name: string
  size: 'phone' | 'desktop'
  children: React.ReactNode
}

type OptionStyle = {
  [key in IItemProps['size']]: OptionStyleDetails
}

type OptionStyleDetails = {
  default: string
}

const styles: OptionStyle = {
  'desktop': { default: "text-sm text-gray-700" },
  'phone': { default: "text-base font-medium text-gray-500" },
}


const SettingsItemContainer = ({ name, size, children }: IItemProps) => {
  return (
    <div className={classNames("flex justify-between px-4 py-2 items-center", styles[size].default)}>
      <span>{name}</span>
      <div className="flex items-center space-x-2">
        {children}
      </div>
    </div>
  )
}

export default SettingsItemContainer