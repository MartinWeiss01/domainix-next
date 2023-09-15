import { classNames } from "@/libs/utilities";
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, LightBulbIcon, ShieldExclamationIcon } from "@heroicons/react/24/outline"

type TNotificationVariant = 'success' | 'error' | 'warning' | 'info' | 'default'
type TVariants = {
  [key in TNotificationVariant]: { style: string; icon: React.ReactElement }
}

const variants: TVariants = {
  success: {
    icon: <CheckCircleIcon className="w-6 h-6" />,
    style: 'bg-green-50 text-green-600',
  },
  error: {
    icon: <ShieldExclamationIcon className="w-6 h-6" />,
    style: 'bg-red-50 text-red-600',
  },
  warning: {
    icon: <ExclamationTriangleIcon className="w-6 h-6" />,
    style: 'bg-yellow-50 text-yellow-600',
  },
  info: {
    icon: <InformationCircleIcon className="w-6 h-6" />,
    style: 'bg-blue-50 text-blue-600',
  },
  default: {
    icon: <LightBulbIcon className="w-6 h-6" />,
    style: 'bg-gray-50 text-gray-600',
  }
}

const Notification = ({
  text,
  variant = 'default',
  customIcon = undefined,
  customStyle = undefined,
}: {
  text: string,
  variant?: TNotificationVariant,
  customIcon?: React.ReactElement | undefined,
  customStyle?: string | undefined
}) => {
  return (
    <div className={classNames(
      "w-100 flex p-4 rounded-lg space-x-4 text-sm items-center font-medium",
      customStyle ? customStyle : variants[variant].style
    )}>
      {customIcon ? customIcon : variants[variant].icon}
      <span>{text}</span>
    </div>
  )
}

export default Notification