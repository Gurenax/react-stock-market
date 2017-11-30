import React from 'react'
import NewsItem from './NewsItem';

const NewsList = ({
  news
}) => (
  <div>
    {news.map((newsItem, index) => {
      return (
        <div key={'news' + index}>
          <NewsItem {...newsItem} />
          <hr />
        </div>
      )
    })}
  </div>
)

export default NewsList