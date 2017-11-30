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
    <div>
      <h4>{ date }</h4>
      <dl>
        <dt>Open</dt>
        <dd>{ open }</dd>

        <dt>High</dt>
        <dd>{ high }</dd>

        <dt>Low</dt>
        <dd>{ low }</dd>

        <dt>Close</dt>
        <dd>{ close }</dd>

        <dt>Volume</dt>
        <dd>{ volume }</dd>

        <dt>Unadjusted Volume</dt>
        <dd>{ unadjustedVolume }</dd>

        <dt>Change</dt>
        <dd>{ change }</dd>

        <dt>Change Percent</dt>
        <dd>{ changePercent }</dd>

        <dt>vwap</dt>
        <dd>{ vwap }</dd>

        <dt>Label</dt>
        <dd>{ label }</dd>

        <dt>Change Over Time</dt>
        <dd>{ changeOverTime }</dd>
      </dl>
    </div>
  )
}

export default ChartItem;