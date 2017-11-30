import React, { Component } from 'react'

import './App.css'
import StockInfo from './components/StockInfo'
import NewsItem from './components/NewsItem'
import ChartItem from './components/ChartItem'
import ChartLineGraph from './components/ChartLineGraph'

import {
  loadQuotesForStock,
  loadLogoForStock,
  loadRecentNewsForStock,
  loadChartForStock
} from './api/iex'

class App extends Component {
  state = {
    error: null,
    enteredSymbol: 'NFLX',
    quote: null,
    quoteHistory: [],
    showHistory: false,
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
      loadRecentNewsForStock(enteredSymbol),
      loadChartForStock(enteredSymbol, '6m')
    ])
      .then(values => {
        const [quote, logo, news, chart] = values
        this.setState(prevState => {
          // Merge the quote and logo
          const quoteWithLogo = { ...quote, logo: logo }
          // Append the quote w/ logo in history
          const history = prevState.quoteHistory
          history.push({ ...quoteWithLogo })

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

  onChangeEnteredSymbol = event => {
    // The <input> text value entered by user
    // No Spaces, Upper case, Limited to 4 chars
    const value = event.target.value
      .trim()
      .toUpperCase()
      .slice(0, 4)
    // Change this.state.enteredSymbol
    this.setState({
      enteredSymbol: value
    })
  }

  onKeyDownPressEnter = event => {
    if (event.keyCode === 13) {
      this.loadQuote()
    }
  }

  onClickShowHistory = event => {
    this.setState(prevState => {
      const showHistory = prevState.showHistory
      return {
        showHistory: !showHistory
      }
    })
  }

  render() {
    const {
      quote,
      enteredSymbol,
      quoteHistory,
      showHistory,
      news,
      chart,
      error
    } = this.state

    const chartReverse = [...chart].reverse()
    const quoteHistoryReverse = [...quoteHistory].reverse()

    const companyName = !!quote && quote.companyName
    const chartCloses = []
    const chartDates = []
    chart.map(chartItem => {
      chartDates.push(chartItem.date)
      chartCloses.push(chartItem.close)
      return null
    })

    return (
      <div>
        <div className="jumbotron jumbotron-fluid bg-dark text-light">
          <div className="container">
            <h1 className="display-3">React Stock Market</h1>
            <p className="lead">A simple stock market API app</p>
            <div className="row">
              <div className="col input-group">
                <input
                  value={enteredSymbol}
                  type="text"
                  className="form-control"
                  placeholder="Symbol e.g. NFLX"
                  aria-label="Symbol"
                  onChange={this.onChangeEnteredSymbol}
                  onKeyDown={this.onKeyDownPressEnter}
                />
                <span className="input-group-btn">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={this.loadQuote}
                  >
                    Load Quote
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row mt-3">
            <div className="col">
              <h2>Latest Quote</h2>
              {!!error && (
                <p>
                  {
                    error.message // Condition that must pass for this to show
                  }
                </p>
              )}
              {!!quote ? <StockInfo {...quote} /> : <p>Loading...</p>}

              <div className="mt-3">
                <button className="btn btn-dark btn-block" onClick={this.onClickShowHistory}>
                  {showHistory ? 'Hide History' : 'Show History'}
                </button>
              </div>

              <div className="mt-3">
                {showHistory &&
                  !!quoteHistory && (
                    <div>
                      <h2>Previous Quotes</h2>
                      {quoteHistoryReverse.map((quoteHistoryItem, index) => {
                        return (
                          <div key={'quote' + index}>
                            <StockInfo {...quoteHistoryItem} />
                            <hr />
                          </div>
                        )
                      })}
                    </div>
                  )}
              </div>

              <div className="mt-3">
                {!!news && (
                  <div>
                    <h2>News about {companyName}</h2>
                    {news.map((newsItem, index) => {
                      return (
                        <div key={'news' + index}>
                          <NewsItem {...newsItem} />
                          <hr />
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="col">
              {!!chart && (
                <div className="charts">
                  <h2>{companyName} (Past 6 months)</h2>
                  <ChartLineGraph
                    title={enteredSymbol}
                    chartLabels={chartDates}
                    chartData={chartCloses}
                  />
                </div>
              )}

              <div className="mt-3">
                {!!chart && (
                  <div>
                    <table className="table">
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col">Date</th>
                          <th scope="col">Open</th>
                          <th scope="col">High</th>
                          <th scope="col">Low</th>
                          <th scope="col">Close</th>
                        </tr>
                      </thead>
                      <tbody>
                        {chartReverse.map((chartItem, index) => {
                          return (
                            <ChartItem
                              key={'chartTable' + index}
                              {...chartItem}
                            />
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
