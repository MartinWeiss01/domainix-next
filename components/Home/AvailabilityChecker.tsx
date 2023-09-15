"use client"
import { ArrowPathIcon, FaceFrownIcon, FaceSmileIcon, QuestionMarkCircleIcon, ShieldExclamationIcon, StopCircleIcon } from "@heroicons/react/24/outline"
import { memo } from "react"
import useSWR from "swr"
import { classNames } from "@/libs/utilities"
import { ITranslationsAvailabilityChecker } from "@/types/translations"
import { TWhoisAPIResponse, TWhoisStatusOptions } from "@/types/api/tokenEndpoint"
import { globalFetcher } from "@/libs/globalSWRFetcher"

type TStatusMapping = {
  [key in TWhoisStatusOptions]: (score: number) => string;
};

type TStatusState = {
  [key in TWhoisStatusOptions]: { style: string; icon: JSX.Element }
};

const statusState: TStatusState = {
  unknown: { style: "bg-gray-50 text-gray-600", icon: <QuestionMarkCircleIcon className="w-6 h-6" /> },
  available: { style: "bg-green-50 text-green-600", icon: <FaceSmileIcon className="w-6 h-6" /> },
  registered: { style: "bg-red-50 text-red-600", icon: <FaceFrownIcon className="w-6 h-6" /> },
  reserved: { style: "bg-yellow-50 text-yellow-600", icon: <StopCircleIcon className="w-6 h-6" /> },
}

const AvailabilityChecker = ({
  token,
  domain,
  tld,
  translations
}: {
  token: string,
  domain: string,
  tld: string,
  translations: ITranslationsAvailabilityChecker
}) => {
  const { data, error, isLoading } = useSWR<TWhoisAPIResponse>(
    [`${process.env.NEXT_PUBLIC_WHOIS_API_URL}/${domain}${tld}`, { headers: { Authorization: `Bearer ${token}` } }],
    ([url, args]) => globalFetcher(url, args),
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  )

  if (isLoading) return (
    <div className="w-100 flex p-4 rounded-lg space-x-4 text-sm items-center font-medium bg-blue-100 text-blue-600">
      <ArrowPathIcon className="w-6 h-6 animate-spin" />
      <span>{translations.loading}</span>
    </div>
  )

  if (error) return (
    <div className="w-100 flex p-4 rounded-lg space-x-4 text-sm items-center font-medium bg-red-100 text-red-600">
      <ShieldExclamationIcon className="w-6 h-6" />
      <span>{translations.error}</span>
    </div>
  )

  const statusTextMap: TStatusMapping = {
    available: (score: number) => {
      if (score > 0.7) return translations.available;
      if (score > 0.5) return translations.availableProbably;
      return translations.availableMaybe;
    },
    registered: (score: number) => {
      if (score > 0.7) return translations.registered;
      if (score > 0.5) return translations.registeredProbably;
      return translations.registeredMaybe;
    },
    reserved: () => translations.reserved,
    unknown: () => translations.unknown,
  };


  if (data !== undefined) {
    const statusFunction = statusTextMap[data.status];

    return (
      <div className={classNames(
        "w-100 flex p-4 rounded-lg space-x-4 text-sm items-center font-medium",
        statusState[data.status].style
      )}>
        {statusState[data.status].icon}
        <span>{statusFunction(data.score)}</span>
      </div>
    )
  }

  return (
    <div className="w-100 flex p-4 rounded-lg space-x-4 text-sm items-center font-medium bg-gray-50 text-gray-600">
      <QuestionMarkCircleIcon className="w-6 h-6" />
      <span>{translations.unknown}</span>
    </div>
  )
}

export default memo(AvailabilityChecker)