import 'server-only'
import { Registrar } from "@/types/apiResponse"
import { ITranslationsCard } from "@/types/translations"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import Image from 'next/image'

const RegistrarCard = ({
  registrar,
  updateDate,
  totalTLD,
  translations
}: {
  registrar: Registrar,
  updateDate: number,
  totalTLD: number,
  translations: ITranslationsCard
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-4">{translations.title}</h2>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-gray-50 rounded-lg overflow-hidden mb-6 max-w-md">
          <div className="bg-cover bg-center h-32 p-4 flex justify-center items-center">
            <Image
              src={registrar.img}
              alt={registrar.name}
              width={237}
              height={72}
            />
          </div>

          <div className="px-4 pb-3 pt-4 bg-gray-100 flex justify-between flex-wrap items-center text-xs uppercase font-bold text-gray-600 tracking-wide">
            <span>{registrar.name}</span>
            <Link href={registrar.url} target="_blank">
              <div className="flex items-center space-x-1">
                <span>{translations.web}</span>
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              </div>
            </Link>
          </div>

          <div className="flex justify-between items-center p-4 text-gray-600 flex-wrap">
            <div className="flex items-center w-full justify-between">
              <span className="text-sm pr-1">{translations.tldCount}</span>
              <span className="text-gray-900 font-bold">{totalTLD}</span>
            </div>
            <div className="flex items-center w-full justify-between">
              <span className="text-sm pr-1">{translations.lastUpdate}</span>
              <span className="text-gray-900 font-bold">{new Date(updateDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegistrarCard