import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
  render() {
    return (
      <div className="container my-4">
        <h2>FreshNews - Top Headlines</h2>
        <div className="row">
          <div className="col md3">
            <NewsItem title="Title" description="description" imageUrl="https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg"/>
            <NewsItem title="Title" description="description" imag/>
          </div>
          <div className="col md3">
          <NewsItem title="Title" description="description"/>
          </div>
          <div className="col md3">
          <NewsItem title="Title" description="description"/>
          </div>
        </div>

      </div>   
    )
  }
}
