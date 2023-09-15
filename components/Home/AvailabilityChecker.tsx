"use client"
import { ArrowPathIcon, FaceFrownIcon, FaceSmileIcon, QuestionMarkCircleIcon, StopCircleIcon } from "@heroicons/react/24/outline"
import { memo } from "react"
import useSWR from "swr"
import { ITranslationsAvailabilityChecker } from "@/types/translations"
import { TWhoisAPIResponse, TWhoisStatusOptions } from "@/types/api/tokenEndpoint"
import { globalFetcher } from "@/libs/globalSWRFetcher"
import Notification, { TNotificationVariant } from "../UI/Notification"

type TStatusMapping = {
  [key in TWhoisStatusOptions]: (score: number) => string;
};

type TStatusState = {
  [key in TWhoisStatusOptions]: { variant: TNotificationVariant; icon: JSX.Element }
};

const statusState: TStatusState = {
  unknown: { variant: "default", icon: <QuestionMarkCircleIcon className="w-6 h-6" /> },
  available: { variant: "success", icon: <FaceSmileIcon className="w-6 h-6" /> },
  registered: { variant: "error", icon: <FaceFrownIcon className="w-6 h-6" /> },
  reserved: { variant: "warning", icon: <StopCircleIcon className="w-6 h-6" /> },
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

  if (isLoading) return <Notification text={translations.loading} variant="info" customIcon={<ArrowPathIcon className="w-6 h-6 animate-spin" />} />
  if (error) return <Notification text={translations.error} variant="error" />

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
    return <Notification text={statusFunction(data.score)} variant={statusState[data.status].variant} customIcon={statusState[data.status].icon} />
  }

  return <Notification text={translations.unknown} customIcon={<QuestionMarkCircleIcon className="w-6 h-6" />} />
}

export default memo(AvailabilityChecker)