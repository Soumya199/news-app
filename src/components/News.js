import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
  constructor(){
    super();
    this.state={
      articles: [],
      loading:false
    }
  }

  async componentDidMount(){
    let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=3889d23a7ece42d6853601af5d29af62";
    let data=await fetch(url);
    let parseData=await data.json();
    console.log(parseData)
    this.setState({articles: parseData.articles})
  }
  
  render() {
    
    return (
      <div className="container my-4">
        <h2>FreshNews - Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((elements)=>{
            return <div className="col md3" key={elements.url}>
            <NewsItem title={elements.title?elements.title.slice(0,50):""} description={elements.description?elements.description.slice(0,88):""} imageUrl={elements.urlToImage?elements.urlToImage:""}/>
          </div>
          })}
        </div>
      </div>   
    )
  }
}
