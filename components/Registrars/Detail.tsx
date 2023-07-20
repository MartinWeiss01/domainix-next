'use client'

import { ObjectStructure } from "@/types/apiResponse"

interface RegistrarDetailProps {
  data: ObjectStructure
}

const RegistrarDetail = ({ data }: RegistrarDetailProps) => {
  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              TLD
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Registration Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Renewal Price
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data?.domains?.map(domain => (
            <tr key={domain.domain}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{domain.domain}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {domain.priceReg} CZK/year
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {domain.priceRen} CZK/year
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default RegistrarDetail