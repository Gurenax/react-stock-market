import React from 'react'

const StockInfo = ({
  symbol, // AAPL
  companyName, // Apple Inc.
  primaryExchange, // Nasdaq Global Select
  latestPrice, // 169.48
  latestSource, // Close
  week52High, // 176.24
  week52Low // 108.25
}) => {
  return (
    <div>
      <h2>{ symbol }: { companyName }</h2>
      <h3>{ latestPrice } ({ latestSource })</h3>
      <dl>
        <dt>Week 52 High</dt>
        <dd>{ week52High }</dd>

        <dt>Week 52 Low</dt>
        <dd>{ week52Low }</dd>

        <dt>Exchange</dt>
        <dd>{ primaryExchange }</dd>
      </dl>
    </div>
  )
}

export default StockInfo
