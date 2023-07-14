'use client'

import { Registrar } from "@/types/apiResponse"

interface RegistrarsListProps {
  registrars: Registrar[]
}

const RegistrarsList = ({ registrars }: RegistrarsListProps) => {
  return (
    <div>
      <h2>Registrars List Component</h2>
      <ul>
        {registrars.map(registrar => (
          <li key={registrar.id}>
            <a href={`registrars/${registrar.slug}`}>{registrar.name} - {JSON.stringify(registrar)}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RegistrarsList