import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProptypes = {
    country: "in",
    category: "sports",
  };
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalPages: 0,
      pageSize: 20,
      totalResults:0
    };
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&pageSize=${this.state.pageSize}`;
    // let data = await fetch(url);
    // let parseData = await data.json();
    // this.setState({
    //   articles: parseData.articles,
    //   totalPages: Math.ceil(parseData.totalResults / this.state.pageSize),
    //   loading: false,
      
    // });
    this.componentUpdate();
  }

  componentUpdate=async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=${this.props.apikey}&page=${
      this.state.page
    }&pageSize=${this.state.pageSize} `;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      loading: false,
      totalResults:parseData.totalResults,
      totalPages: Math.ceil(parseData.totalResults / this.state.pageSize),
    });
  }

  fetchMoreData=async()=>{
    this.props.progress(10)
    this.state.page +=this.state.page;
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=${this.props.apikey}&page=${
      this.state.page
    }&pageSize=${this.state.pageSize} `;
    let data = await fetch(url);
    this.props.progress(30)
    let parseData = await data.json();
    this.props.progress(70)
    this.setState({
      articles:this.state.articles.concat(parseData.articles) ,
      loading: false,
    });
    this.props.progress(100)
  }

  handlePrivClick = async () => {
    this.setState({ loading: true });
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=${this.props.apikey}&page=${
    //   this.state.page - 1
    // }&pageSize=${this.state.pageSize} `;
    // let data = await fetch(url);
    // let parseData = await data.json();
    this.setState({
      page: this.state.page - 1,
      totalPages: this.state.totalPages + 1,
    });
  };

  handleNextClick = async () => {
    this.setState({ loading: true });
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=${this.props.apikey}&page=${
    //   this.state.page + 1
    // }&pageSize=${this.state.pageSize}`;
    // let data = await fetch(url);
    // let parseData = await data.json();
    // console.log(parseData);
    this.setState({
      page: this.state.page + 1,
      totalPages: this.state.totalPages - 1,
      // articles: parseData.articles,
      // loading: false,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{ margin: "90px 0px" }}>
          FreshNews - Top Headlines
        </h2>
        {this.state.loading?<Spinner/>:""}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
          style={{overflow:"hidden"}}
        >
        <div className="row">
          {this.state.articles.map((elements) => {
                return (
                  <div className="col-md-4" key={elements.url}>
                    <NewsItem
                      title={elements.title ? elements.title.slice(0, 50) : ""}
                      description={
                        elements.description
                          ? elements.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={elements.urlToImage ? elements.urlToImage : ""}
                      sourceUrl={elements.url ? elements.url : ""}
                      author={elements.author?elements.author:""} 
                      date={elements.publishedAt?elements.publishedAt:""}
                      source={elements.source.name?elements.source.name:""}
                    />
                  </div>
                );
              })}
        </div>
        </InfiniteScroll>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-success"
            onClick={this.handlePrivClick}
          >
            &#8249; Prev
          </button>
          <button
            type="button"
            className="btn btn-success"
            disabled={this.state.totalPages <= 1}
            onClick={this.handleNextClick}
          >
            Next &#8250;
          </button>
        </div>
      </div>
    );
  }
}
