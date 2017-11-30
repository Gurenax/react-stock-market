import React from 'react'

const ChartItem = ({
  date,
  open,
  high,
  low,
  close,
  volume,
  unadjustedVolume,
  change,
  changePercent,
  vwap,
  label,
  changeOverTime
}) => {
  return (
    <tr>
      <th scope="row">{ date }</th>
      <td>{ open }</td>
      <td>{ high }</td>
      <td>{ low }</td>
      <td>{ close }</td>
    </tr> 
  )
}

export default ChartItem;