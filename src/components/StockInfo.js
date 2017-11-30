import React from 'react'

const StockInfo = ({
  symbol, // AAPL
  companyName, // Apple Inc.
  primaryExchange, // Nasdaq Global Select
  latestPrice, // 169.48
  latestSource, // Close
  week52High, // 176.24
  week52Low, // 108.25
  logo
}) => {
  return (
    <div className="card">
      
      <div className="card-body d-flex flex-wrap">
        <img className="p-2" src={ logo } alt='' />
        <h2 className="card-title p-2"><strong>{ symbol } - { companyName }</strong></h2>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item"><strong>{ latestSource }</strong> <span className="text-primary">{ latestPrice }</span></li>
        <li className="list-group-item"><strong>Week 52 High</strong> <span className="text-success">{ week52High }</span></li>
        <li className="list-group-item"><strong>Week 52 Low</strong> <span className="text-danger">{ week52Low }</span></li>
        <li className="list-group-item"><strong>Exchange</strong> { primaryExchange }</li>
      </ul>
      
    </div>
  )
}

export default StockInfo
