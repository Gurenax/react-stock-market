import React from 'react'
import NewsItem from './NewsItem';

const NewsList = ({
  news
}) => (
  <div>
    {news.map((newsItem, index) => {
      return (
        <div key={'news' + index}>
          <hr />
          <NewsItem {...newsItem} />
        </div>
      )
    })}
  </div>
)

export default NewsList