import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';

export class News extends Component {

  static defaultProps = {
    country: "us",
    pageSize: 10,
    category: "general"
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  // articles = [];
  // now we are fetching the data from the API so we don't need this static data in our "articles" array

  constructor() {
    super(); // This is necessary to call the (super class) parent constructor , without this we will get error
    // console.log("Hello I am a constructor from News component");
    this.state = {
      // jaise hm functional based component mai state ka use krte "useState Hook " k help se ,waise hi class based component mai bhi state ka use kr skte hai , wha hm pehle ek variable mai state ka use krte (ie. mode variable in textutils project) the aur uske baad us variable ko set krte the setmode function k help se , yha hm pehle ek variable "articles" ko "this.articles" bolke "article" variable state mai daal rhe hai jo ki state ka ek object hai
      articles: [],
      loading: false,
      page: 1,
    };
  }

  // componentDidMount is a lifecycle method which is called after the render method is called , it is used to fetch the data from the API
  async componentDidMount() {
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4b33e849bb6249678a44d5f5bf4db599&page=1&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
  
      let data = await fetch(url);
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
  
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles || [], // Ensure articles is an array
        totalResults: parsedData.totalResults || 0,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ articles: [], loading: false }); // Set articles to an empty array on error
    }
  }
  
  prevPage = async () => {
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4b33e849bb6249678a44d5f5bf4db599&page=${
        this.state.page - 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
  
      let data = await fetch(url);
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
  
      let parsedData = await data.json();
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles || [],
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching previous page:", error);
      this.setState({ loading: false });
    }
  };
  
  nextPage = async () => {
    try {
      if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
        let url = `https://your-proxy-server-url/news?country=${this.props.country}&category=${this.props.category}&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
  
        let data = await fetch(url);
        if (!data.ok) {
          throw new Error(`HTTP error! status: ${data.status}`);
        }
  
        let parsedData = await data.json();
        this.setState({
          page: this.state.page + 1,
          articles: parsedData.articles || [],
          loading: false,
        });
      }
    } catch (error) {
      console.error("Error fetching next page:", error);
      this.setState({ loading: false });
    }
  };
  
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ marginTop: "35px", marginBottom: "20px" }}>
          NewsMonkey - Top Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 44) : " "}
                    description={element.description ? element.description.slice(0, 88) : ""}
                    imageUrl={element.urlToImage}
                    NewsUrl={element.url}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between my-3">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-outline-info"
            onClick={this.prevPage}
          >
            &larr; Previous
          </button>
  
          <button
            disabled={
              this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-outline-info"
            onClick={this.nextPage}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
export default News;