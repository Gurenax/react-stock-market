import React from 'react'
import ChartItem from './ChartItem'

const ChartTable = ({
  chart
}) => {
  return (
    <div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Open</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Close</th>
          </tr>
        </thead>
        <tbody>
          {chart.map((chartItem, index) => {
            return (
              <ChartItem
                key={'chartTable' + index}
                {...chartItem}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ChartTable