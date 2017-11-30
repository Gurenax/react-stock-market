import React, { Component } from 'react'
import {Line as LineChart} from 'react-chartjs-2'
// import logo from './logo.svg'
import './App.css'
import StockInfo from './components/StockInfo'
import NewsItem from './components/NewsItem'
import ChartItem from './components/ChartItem'

import { loadQuotesForStock, loadLogoForStock, loadRecentNewsForStock, loadChartForStock } from './api/iex'

class App extends Component {
  state = {
    error: null,
    enteredSymbol: 'NFLX',
    quote: null,
    quoteHistory: [],
    news: [],
    chart: []
  }

  // The first time our component is rendered
  // this method is called
  componentDidMount() {
    this.loadQuote()
  }

  loadQuote = () => {
    const { enteredSymbol } = this.state

    Promise.all([
      loadQuotesForStock(enteredSymbol),
      loadLogoForStock(enteredSymbol),
      loadRecentNewsForStock( enteredSymbol ),
      loadChartForStock( enteredSymbol, '6m' )
    ])
    .then( (values) => {
      const [quote, logo, news, chart] = values
      this.setState( (prevState) => {
        // Merge the quote and logo
        const quoteWithLogo = { ...quote, logo: logo }
        // Append the quote w/ logo in history
        const history = prevState.quoteHistory
        history.push( {...quoteWithLogo} )
        
        return {
          quote: quoteWithLogo,
          error: null,
          quoteHistory: history,
          news: news,
          chart: chart
        }
      })
    })
    .catch(error => {
      // If 404 not found
      if (error.response.status === 404) {
        error = new Error(`The stock symbol ${enteredSymbol} does not exist`)
      }
      this.setState({ error: error })
      console.error('Error loading logo', error.message)
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
    const { quote, enteredSymbol, quoteHistory, news, chart, error } = this.state
    const chartDataClose = []
    const chartDataDates = []
    this.state.chart.map( chartItem => {
      chartDataClose.push(chartItem.close)
      chartDataDates.push(chartItem.date)
    })
    const chartData = {
      labels: chartDataDates, //["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
          label: `${enteredSymbol}`,
          data: chartDataClose, //[12, 19, 3, 5, 2, 3],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)'
              // 'rgba(54, 162, 235, 0.2)',
              // 'rgba(255, 206, 86, 0.2)',
              // 'rgba(75, 192, 192, 0.2)',
              // 'rgba(153, 102, 255, 0.2)',
              // 'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)'
              // 'rgba(54, 162, 235, 1)',
              // 'rgba(255, 206, 86, 1)',
              // 'rgba(75, 192, 192, 1)',
              // 'rgba(153, 102, 255, 1)',
              // 'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
    }
    const chartOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
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
        {!!quote ? <StockInfo { ...quote } /> : <p>Loading...</p>}

        {!!quoteHistory &&
          <div>
            <hr />
            <h2>History of Quotes</h2>
            {
              quoteHistory.map( (quoteHistoryItem, index) => {
                return (
                  <div key={'quote'+index}>
                    <StockInfo { ...quoteHistoryItem } />
                    <hr />
                  </div>
                )
              })
            }
          </div>
        }

        {!!news &&
          <div>
            <h2>News</h2>
            {
              news.map( (newsItem, index) => {
                return (
                  <div key={'news'+index}>
                    <NewsItem { ...newsItem } />
                    <hr />
                  </div>
                )
              })
            }
          </div>
        }

        {!!chart &&
          <div>
            <h2>6 month chart</h2>
            <LineChart data={chartData} options={chartOptions}/>
            <h2>6 month table</h2>
            {
              chart.map( (chartItem, index) => {
                return (
                  <div key={'chartTable'+index}>
                    <ChartItem { ...chartItem } />
                    <hr />
                  </div>
                )
              })
            }
          </div>
        }
      </div>
    )
  }
}

export default App
