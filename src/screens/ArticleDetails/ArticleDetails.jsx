import React from "react";
import { Card, Row, Col } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import "./ArticleDetails.css";

class ArticleDetails extends React.Component {
  state = {
    doctorData: {
      fullName: "",
      image: "",
      specialist: "",
      address: "",
      desc: "",
      id: 0,
    },
  };

  componentDidMount() {
    Axios.get(`${API_URL}/doctors/${this.props.match.params.doctorId}`)
      .then((res) => {
        this.setState({ doctorData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const {
      fullName,
      image,
      specialist,
      desc,
      address,
    } = this.state.doctorData;
    return (
      <div>
        <div className="article-container container">
          <div className="row">
            <div className="col-lg-2 col-sm-0"></div>
            <div className="col-lg-8 col-sm-12 posts-list">
              <div className="single-post">
                <div className="feature-img">
                  <img
                    className="img-fluid pt-5"
                    src="https://www.bumrungrad.com/getattachment/991f00c7-ae5a-428b-a33c-2f702154c1d9/image.jpg"
                    alt=""
                  />
                </div>
                <div className="article_details">
                  <h2>
                    Second divided from form fish beast made every of seas all
                    gathered us saying he our
                  </h2>
                  <p className="excert">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Ipsa inventore sapiente hic eligendi ex nostrum autem
                    repudiandae eaque itaque nemo ratione quasi suscipit quod
                    facere minus amet praesentium, illo possimus! Lorem ipsum,
                    dolor sit amet consectetur adipisicing elit. Doloremque
                    magni neque animi nam commodi dicta tempore ducimus.
                    Voluptatem officiis cumque, quia nobis ullam repellendus
                    commodi alias vitae quas quasi ipsa? Lorem ipsum, dolor sit
                    amet consectetur adipisicing elit. Doloremque magni neque
                    animi nam commodi dicta tempore ducimus. Voluptatem officiis
                    cumque, quia nobis ullam repellendus commodi alias vitae
                    quas quasi ipsa?
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
