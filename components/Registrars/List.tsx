'use client'

import { Registrar } from "@/types/apiResponse"
import Link from "next/link"

interface RegistrarsListProps {
  registrars: Registrar[]
}

const RegistrarsList = ({ registrars }: RegistrarsListProps) => {
  return (
    <div>
      <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 items-center gap-x-2 gap-y-6 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 md:gap-y-10 md:grid-cols-4 md:max-w-3xl lg:mx-0 lg:max-w-none lg:grid-cols-5">
        {registrars.map(registrar => (
          <div key={registrar.id} className="p-2">
            <Link href={`registrars/${registrar.slug}`} key={registrar.id}>
              <img
                className="col-span-4 max-h-10 md:max-h-16 w-full object-contain lg:col-span-1 scale-90 hover:scale-100 transition duration-300 ease-in-out"
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