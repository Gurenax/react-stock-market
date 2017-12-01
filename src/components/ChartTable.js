import React from 'react'
import ChartItem from './ChartItem'

const ChartTable = ({ chart }) => (
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
          return chartItem.change < 0 ? (
            <ChartItem key={'chartTable' + index} {...chartItem} stockIsUp />
          ) : (
            <ChartItem key={'chartTable' + index} {...chartItem} />
          )
        })}
      </tbody>
    </table>
  </div>
)

export default ChartTable
