'use client'

import { Registrar } from "@/types/apiResponse"

interface RegistrarDetailProps {
  registar: Registrar
}

const RegistrarDetail = ({ registar }: RegistrarDetailProps) => {
  return (
    <div>
      <h1>Registrar Detail Component</h1>
      <p>{JSON.stringify(registar)}</p>
    </div>
  )
}

export default RegistrarDetail