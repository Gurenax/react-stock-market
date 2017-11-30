import React from 'react'

const NewsItem = ({
  datetime,
  headline,
  source,
  url,
  summary
}) => {
  return (
    <div>
      <h3>{ headline }</h3>
      <div>
        <em>{ datetime }</em>
      </div>
      <div>
        <span>{ source } - { url }</span>
      </div>
      <div>
        <p>
          { summary }
        </p>
      </div>
    </div>
  )
}

export default NewsItem