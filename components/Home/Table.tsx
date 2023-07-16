'use client'

import { useCart } from "@/store/cart"
import { EstimationData } from "@/types/estimation"

interface TableProps {
  estimationData: EstimationData[]
  processing: boolean
  domainName: string
  years: number
}

const Table = ({ estimationData, processing, domainName, years }: TableProps) => {
  const { addDomain } = useCart()

  const handleAddToCart = (estimationEl: EstimationData) => {
    addDomain({
      ...estimationEl,
      selectedDomain: domainName,
      years: years
    })
  }

  return (
    <div className="bg-blue-400">
      <h2>Table Component</h2>
      <table>
        <thead>
          <tr>
            <th>RName</th>
            <th>date</th>
            <th>domain</th>
            <th>priceReg</th>
            <th>priceRen</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {estimationData.map(el => (
            <tr key={el.registrar.id}>
              <td>{el.registrar.name}</td>
              <td>{el.date}</td>
              <td>{el.detail.domain}</td>
              <td>{el.detail.priceReg}</td>
              <td>{el.detail.priceRen}</td>
              <td>
                <button onClick={() => handleAddToCart(el)}>
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {processing && <p>Processing...</p>}
    </div>
  )
}

export default Table