import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons/";
import "./ArticleCard.css";
// import { Button } from "reactstrap";

interface ArticleCardData {
  id?: number;
  title?: string;
  image?: string;
  text?: string;
  postDate?: string;
}

type ArticleCardProps = {
  data: ArticleCardData;
};

class ArticleCard extends React.Component<ArticleCardProps> {
  render() {
    // const { id, fullName, address, image } = this.props.data;

    return (
      <div>
        <div className="article-card m-2">
          <img
            className="card-img"
            src={this.props.data.image}
            alt={this.props.data.title}
            style={{ width: "334px", height: "272px", objectFit: "cover" }}
          />
          <div className="article-card-body text-justify">
            <a
              className="text-center"
              style={{ textDecoration: "none", color: "inherit" }}
              href="/article"
            >
              <h4>{this.props.data.title}</h4>
            </a>
            <FontAwesomeIcon icon={faCalendarAlt} /> {this.props.data.postDate}
            <p className="mt-2">{this.props.data.text}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleCard;
