'use client'

import { Registrar } from "@/types/apiResponse"

const RegistrarCard = ({
  registrar,
  updateDate
}: {
  registrar: Registrar,
  updateDate: number
}) => {
  return (
    <div>
      <h2>{registrar.name}</h2>
      <span>

      </span>
    </div>
  )
}

export default RegistrarCard