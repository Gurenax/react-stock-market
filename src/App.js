import React, { Component } from "react";

import "./App.css";
import StockInfo from "./components/StockInfo";
import NewsList from "./components/NewsList";
import ChartLineGraph from "./components/ChartLineGraph";
import ChartTable from "./components/ChartTable";

import {
  loadQuotesForStock,
  loadLogoForStock,
  loadRecentNewsForStock,
  loadChartForStock
} from "./api/iex";

class App extends Component {
  state = {
    error: null,
    enteredSymbol: "NFLX",
    quote: null,
    quoteHistory: [],
    showHistory: false,
    news: [],
    showAllNews: false,
    chart: [],
    showAllChart: false
  };

  // The first time our component is rendered
  // this method is called
  componentDidMount() {
    this.loadQuote();
  }

  loadQuote = () => {
    const { enteredSymbol } = this.state;

    Promise.all([
      loadQuotesForStock(enteredSymbol),
      loadLogoForStock(enteredSymbol),
      loadRecentNewsForStock(enteredSymbol),
      loadChartForStock(enteredSymbol, "6m")
    ])
      .then(values => {
        const [quote, logo, news, chart] = values;
        this.setState(prevState => {
          // Merge the quote and logo
          const quoteWithLogo = { ...quote, logo: logo };
          // Append the quote w/ logo in history
          const history = prevState.quoteHistory;
          history.push({ ...quoteWithLogo });

          return {
            quote: quoteWithLogo,
            error: null,
            quoteHistory: history,
            news: news,
            chart: chart
          };
        });
      })
      .catch(error => {
        // If 404 not found
        if (error.response.status === 404) {
          error = new Error(`The stock symbol ${enteredSymbol} does not exist`);
        }
        this.setState({ error: error });
      });
  };

  onChangeEnteredSymbol = event => {
    // The <input> text value entered by user
    // No Spaces, Upper case, Limited to 4 chars
    const value = event.target.value
      .trim()
      .toUpperCase()
      .slice(0, 4);
    // Change this.state.enteredSymbol
    this.setState({
      enteredSymbol: value
    });
  };

  onKeyDownPressEnter = event => {
    if (event.keyCode === 13) {
      this.loadQuote();
    }
  };

  onClickShowHistory = event => {
    this.setState(prevState => {
      const showHistory = prevState.showHistory;
      return {
        showHistory: !showHistory
      };
    });
  };

  onClickShowAllChart = event => {
    this.setState(prevState => {
      const showAllChart = prevState.showAllChart;
      return {
        showAllChart: !showAllChart
      };
    });
  };

  onClickShowAllNews = event => {
    this.setState(prevState => {
      const showAllNews = prevState.showAllNews;
      return {
        showAllNews: !showAllNews
      };
    });
  };

  render() {
    const {
      quote,
      enteredSymbol,
      quoteHistory,
      showHistory,
      news,
      showAllNews,
      chart,
      showAllChart,
      error
    } = this.state;

    const chartReverse = [...chart].reverse();
    const chartReverseMin = chartReverse.slice(0, 12);

    const quoteHistoryReverse = [...quoteHistory].reverse();

    const newsMin = [...news].slice(0, 2);

    const companyName = !!quote && quote.companyName;
    const chartCloses = [];
    const chartDates = [];
    chart.map(chartItem => {
      chartDates.push(chartItem.label);
      chartCloses.push(chartItem.close);
      return null;
    });

    return (
      <div className="App pb-3">
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
          <div className="row">
            {!!error && (
              <div className="col alert alert-danger" rolw="alert">
                <h4 className="alert-heading">Sadly..</h4>
                <p>
                  {
                    error.message // Condition that must pass for this to show
                  }
                </p>
              </div>
            )}
          </div>

          <div className="row mt-3">
            <div className="col">
              <h2>Latest Quote</h2>
              {!!quote ? <StockInfo {...quote} /> : <p>Loading...</p>}

              <div className="mt-3">
                <button
                  className="btn btn-dark btn-block"
                  onClick={this.onClickShowHistory}
                >
                  {showHistory
                    ? "Hide Previous Quotes"
                    : "Show Previous Quotes"}
                </button>
              </div>

              <div className="mt-3">
                {showHistory && !!quoteHistory && (
                  <div>
                    <h2 className="text-center">Previous Quotes</h2>
                    {quoteHistoryReverse.map((quoteHistoryItem, index) => {
                      return (
                        <div key={"quote" + index}>
                          <StockInfo {...quoteHistoryItem} />
                          <hr />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="mt-5">
                <h2>{!!companyName && "News about " + companyName}</h2>
                {!showAllNews && !!newsMin && <NewsList news={newsMin} />}
                {showAllNews && !!news && (
                  <div>
                    <NewsList news={news} />
                  </div>
                )}
                <button
                  className="btn btn-dark btn-block"
                  onClick={this.onClickShowAllNews}
                >
                  {showAllNews ? "Show Less" : "Show All"}
                </button>
              </div>
            </div>

            <div className="col">
              {!!chart && (
                <div className="charts">
                  <h2 className="text-center">
                    {!!companyName && companyName + " (Past 6 months)"}
                  </h2>
                  <ChartLineGraph
                    title={enteredSymbol}
                    chartLabels={chartDates}
                    chartData={chartCloses}
                  />
                </div>
              )}

              <div className="mt-3">
                {!showAllChart && !!chartReverseMin && (
                  <ChartTable chart={chartReverseMin} />
                )}
                {showAllChart && !!chartReverse && (
                  <ChartTable chart={chartReverse} />
                )}
                <button
                  className="btn btn-dark btn-block"
                  onClick={this.onClickShowAllChart}
                >
                  {showAllChart ? "Show Less" : "Show All"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
