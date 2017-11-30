import React from 'react'
import ChartItem from './ChartItem'

const ChartTable = ({ chart }) => {
  const chartLength = chart.length
  return (
    <div>
      <table className="table">
        <thead>
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
            const lastClose = index < chartLength-1 ? chart[index + 1].close : chart.open
            return chartItem.close > lastClose ? (
              <ChartItem key={'chartTable' + index} {...chartItem} stockIsUp />
            ) : (
              <ChartItem key={'chartTable' + index} {...chartItem} />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ChartTable
