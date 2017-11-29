import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import StockInfo from './components/StockInfo'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>React Stock Market</h1>
        <StockInfo />
      </div>
    )
  }
}

export default App
