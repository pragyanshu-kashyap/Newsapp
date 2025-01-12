import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, NewsUrl } = this.props;

    return (
      <div className="my-4">
        <div className="card" style={{ width: "18rem" }}>
          <img src={imageUrl ? imageUrl : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text"> {description}... </p>
            <a
              href={NewsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-primary"
            >
              Tap To Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
