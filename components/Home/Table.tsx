'use client'

import { EstimationData } from "@/types/estimation"

interface TableProps {
  estimationData: EstimationData[]
  processing: boolean
}

const Table = ({ estimationData, processing }: TableProps) => {
  return (
    <div className="bg-blue-400">
      <h2>Table Component</h2>
      <table>
        <thead>
          <tr>
            <th>rid</th>
            <th>date</th>
            <th>domain</th>
            <th>priceReg</th>
            <th>priceRen</th>
          </tr>
        </thead>
        <tbody>
          {estimationData.map(el => (
            <tr key={el.rid}>
              <td>{el.rid}</td>
              <td>{el.date}</td>
              <td>{el.domain}</td>
              <td>{el.priceReg}</td>
              <td>{el.priceRen}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {processing && <p>Processing...</p>}
    </div>
  )
}

export default Table