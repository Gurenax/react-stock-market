import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import StockInfo from './components/StockInfo'

class App extends Component {
  state = {
    quote: {
      symbol: 'AAPL',
      companyName: 'Apple Inc.',
      primaryExchange: 'Nasdaq Global Select',
      latestPrice: 169.48,
      latestSource: 'Close',
      week52High: 176.24,
      week52Low: 108.25,
    }
  }

  render() {
    const { quote } = this.state

    return (
      <div className="App">
        <h1>React Stock Market</h1>
        <StockInfo
          { ...quote }
        />
      </div>
    )
  }
}

export default App
