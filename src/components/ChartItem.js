import React from 'react'

const ChartItem = ({
  date,
  open,
  high,
  low,
  close,
  volume,
  stockIsUp
  // unadjustedVolume,
  // change,
  // changePercent,
  // vwap,
  // label,
  // changeOverTime
}) => {
  return (
    <tr>
      <th scope="row">{date}</th>
      <td>{open}</td>
      <td>{high}</td>
      <td>{low}</td>
      <td className={!!stockIsUp ? 'text-success' : 'text-danger'}>
        {
          !!stockIsUp ? String.fromCharCode(9650)+' '+close : String.fromCharCode(9660)+' '+close
        }
      </td>
    </tr>
  )
}

export default ChartItem
