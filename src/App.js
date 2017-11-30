import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import StockInfo from './components/StockInfo'
import { loadQuotesForStock } from './api/iex'

class App extends Component {
  state = {
    error: null,
    enteredSymbol: 'NFLX',
    quote: null
  }

  // The first time our component is rendered
  // this method is called
  componentDidMount() {
    // loadQuotesForStock('nflx')
    //   .then(quote => {
    //     this.setState({
    //       quote: quote
    //     })
    //   })
    //   .catch(error => {
    //     // If 404 not found
    //     if (error.response.status === 404) {
    //       error = new Error('The stock symbol does not exist')
    //     }
    //     this.setState({ error: error })
    //     // console.log( Object.keys(error) )
    //     // console.error('Error loading quote', error)
    //     console.error('Error loading quote', error.message)
    //   })
    this.loadQuote()
  }

  loadQuote = () => {
    const { enteredSymbol } = this.state

    loadQuotesForStock(enteredSymbol)
      .then(quote => {
        this.setState({
          quote: quote,
          error: null
        })
      })
      .catch(error => {
        // If 404 not found
        if (error.response.status === 404) {
          error = new Error(`The stock symbol ${enteredSymbol} does not exist`)
        }
        this.setState({ error: error })
        // console.log( Object.keys(error) )
        // console.error('Error loading quote', error)
        console.error('Error loading quote', error.message)
      })
  }

  onChangeEnteredSymbol = (event) => {
    // The <input> text value entered by user
    // No Spaces, Upper case, Limited to 4 chars
    const value = event.target.value.trim().toUpperCase().slice(0, 4)
    // Change this.state.enteredSymbol
    this.setState({
      enteredSymbol: value
    })
  }

  render() {
    const { quote, enteredSymbol, error } = this.state

    return (
      <div className="App">
        <h1 className="AppTitle">React Stock Market</h1>

        <input
          value={enteredSymbol}
          placeholder="Symbol e.g. NFLX"
          aria-label="Symbol"
          onChange={ this.onChangeEnteredSymbol }
        />
        <button
          className='ml-1'
          onClick={ this.loadQuote }
        >
          Load Quote
        </button>

        {!!error && <p>{error.message // Condition that must pass for this to show
          }</p>}
        {!!quote ? <StockInfo {...quote} /> : <p>Loading...</p>}
      </div>
    )
  }
}

export default App
