import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  // articles = [];
  // now we are fetching the data from the API so we don't need this static data in our "articles" array

  constructor() {
    super(); // This is necessary to call the (super class) parent constructor , without this we will get error
    // console.log("Hello I am a constructor from News component");
    this.state = {
      // jaise hm functional based component mai state ka use krte the waise hi class based component mai bhi state ka use kr skte hai , wha hm pehle ek variable mai state ka use krte (ie. mode variable in textutils project) the aur uske baad us variable ko set krte the setmode function k help se , yha hm pehle ek variable "articles" ko "this.articles" bolke "article" variable state mai daal rhe hai jo ki state ka ek object hai
      articles: [],
      loading: false,
      page: 1,
    };
  }

  // componentDidMount is a lifecycle method which is called after the render method is called , it is used to fetch the data from the API
  async componentDidMount() {
    //console.log("cdm");
    let url = `https://newsapi.org/v2/everything?q=global&from=2025-01-11&to=2025-01-11&sortBy=popularity&apiKey=4b33e849bb6249678a44d5f5bf4db599&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url); // fetch is a function which is used to fetch the data from the API

    let parsedData = await data.json(); // json is a function which is used to convert the data into json format
    //console.log(parsedData)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    }); // setState is a function which is used to set the state of the variable;
  }

  prevPage = async () => {
    let url = `https://newsapi.org/v2/everything?q=global&from=2025-01-11&to=2025-01-11&sortBy=popularity&apiKey=4b33e849bb6249678a44d5f5bf4db599&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url); // fetch is a function which is used to fetch the data from the API

    let parsedData = await data.json(); // json is a function which is used to convert the data into json format

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    });
  };

  nextPage = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      // Math.ceil is a function which is used to round off the number to the nearest intege
      let url = `https://newsapi.org/v2/everything?q=global&from=2025-01-11&to=2025-01-11&sortBy=popularity&apiKey=4b33e849bb6249678a44d5f5bf4db599&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url); // fetch is a function which is used to fetch the data from the API
      let parsedData = await data.json(); // json is a function which is used to convert the data into json format
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      });
    }
  };

  render() {
    // console.log("render");
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey - Top Headlines</h1>
        {this.state.loading && <Spinner/>}

        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            // map is a high order function which is used to iterate over each element of the array or object
            return (
              <div className="col-md-4" key={element.url}>
                {/*// gave md-4 to adjust 3 news in a row since grid is of 12 in Bootstrap*/}
                <NewsItem
                  title={element.title ? element.title.slice(0, 44) : " "} // slice is used to limit the number of characters to be displayed
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  // all left side variables are being passed as props to NewsItem component
                  // and all right side variables after "elements." are being fetched from the "key" of the "articles" which is "element" here
                  imageUrl={element.urlToImage}
                  NewsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
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
              this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)
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
