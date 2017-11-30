import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import StockInfo from './components/StockInfo'
import { loadQuotesForStock } from './api/iex'

class App extends Component {
  state = {
    quote: null
  }

  // The first time our component is rendered
  // this method is called
  componentDidMount() {
    loadQuotesForStock('nflx')
      .then( (quote) => {
        this.setState({
          quote: quote
        })
      })
  }

  render() {
    const { quote } = this.state

    return (
      <div className="App">
        <h1>React Stock Market</h1>
        {
          !!quote ? (
            <StockInfo
              { ...quote }
            />
          ) : (
            <p>Loading...</p>
          )
        }
        
      </div>
    )
  }
}

export default App
