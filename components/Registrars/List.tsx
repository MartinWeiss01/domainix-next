'use client'

import { Registrar } from "@/types/apiResponse"
import Link from "next/link"

interface RegistrarsListProps {
  registrars: Registrar[]
}

const RegistrarsList = ({ registrars }: RegistrarsListProps) => {
  return (
    <div>
      <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-16 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
        {registrars.map(registrar => (
          <div className="shadow p-2">
            <Link href={`registrars/${registrar.slug}`} key={registrar.id}>
              <img
                className="col-span-4 max-h-16 w-full object-contain lg:col-span-1"
                src={registrar.img}
                alt={registrar.name}
                width={158}
                height={48}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RegistrarsList