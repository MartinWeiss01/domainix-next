'use client'

import { Registrar } from "@/types/apiResponse"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

const RegistrarCard = ({
  registrar,
  updateDate,
  totalTLD
}: {
  registrar: Registrar,
  updateDate: number,
  totalTLD: number
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight my-4">Registrar Details</h2>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-gray-50 rounded-lg overflow-hidden mb-6 max-w-md">
          <div className="bg-cover bg-center h-32 p-4 flex justify-center items-center">
            <img className="max-h-full" src={registrar.img}
              loading="lazy"
              onError={e => {
                (e.target as HTMLImageElement).onerror = null;
                (e.target as HTMLImageElement).src = "/img/logo-placeholder.svg";
              }}
            />
          </div>

          <div className="px-4 pb-3 pt-4 bg-gray-100 flex justify-between flex-wrap">
            <div className="text-xs uppercase font-bold text-gray-600 tracking-wide">
              {registrar.name}
            </div>
            <Link href={registrar.url} target="_blank">
              <div className="flex text-xs uppercase font-bold text-gray-600 tracking-wide items-center">
                <span>Web</span>
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              </div>
            </Link>
          </div>

          <div className="flex justify-between items-center p-4 text-gray-600 flex-wrap">
            <div className="flex items-center w-full justify-between">
              <span className="text-sm pr-1">Total TLDs</span>
              <span className="text-gray-900 font-bold">{totalTLD}</span>
            </div>
            <div className="flex items-center w-full justify-between">
              <span className="text-sm pr-1">Last Update</span>
              <span className="text-gray-900 font-bold">{new Date(updateDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegistrarCard