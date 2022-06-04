import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

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
      loading: false,
      page: 1,
      totalPages: 0,
      pageSize: 20,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3889d23a7ece42d6853601af5d29af62&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalPages: Math.ceil(parseData.totalResults / this.state.pageSize),
      loading: false,
    });
  }

  handlePrivClick = async () => {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=3889d23a7ece42d6853601af5d29af62&page=${
      this.state.page - 1
    }&pageSize=${this.state.pageSize} `;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      page: this.state.page - 1,
      totalPages: this.state.totalPages + 1,
      articles: parseData.articles,
      loading: false,
    });
  };

  handleNextClick = async () => {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=3889d23a7ece42d6853601af5d29af62&page=${
      this.state.page + 1
    }&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      page: this.state.page + 1,
      totalPages: this.state.totalPages - 1,
      articles: parseData.articles,
      loading: false,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{ margin: "35px 0px" }}>
          FreshNews - Top Headlines
        </h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {this.state.loading
            ? ""
            : this.state.articles.map((elements) => {
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
                      author={elements.author} 
                      date={elements.publishedAt}
                      source={elements.source.name}
                    />
                  </div>
                );
              })}
        </div>
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
