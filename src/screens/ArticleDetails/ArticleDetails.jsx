import React from "react";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import "./ArticleDetails.css";

class ArticleDetails extends React.Component {
  state = {
    articleData: {
      title: "",
      image: "",
      text: "",
      postDate: "",
    },
  };

  componentDidMount() {
    Axios.get(`${API_URL}/articles/${this.props.match.params.articleId}`)
      .then((res) => {
        this.setState({ articleData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <div className="article-container container">
          <div className="row">
            <div className="col-lg-2 col-sm-0"></div>
            <div className="col-lg-8 col-sm-12 posts-list">
              <div className="single-post">
                <div>
                  <img
                    className="img-article pt-5"
                    src={this.state.articleData.image}
                    alt=""
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="article_details">
                  <h2 className="mt-3 text-center">
                    {this.state.articleData.title}
                  </h2>
                  <p className="text-secondary">
                    {this.state.articleData.text}
                  </p>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Doloremque magni neque animi nam commodi dicta tempore
                    ducimus. Voluptatem officiis cumque, quia nobis ullam
                    repellendus commodi alias vitae quas quasi ipsa?
                  </p>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Doloremque magni neque animi nam commodi dicta tempore
                    ducimus. Voluptatem officiis cumque, quia nobis ullam
                    repellendus commodi alias vitae quas quasi ipsa?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleDetails;
