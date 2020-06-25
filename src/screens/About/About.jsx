import React from "react";
import "./About.css";
import bg2 from "../../assets/images/banner/bg2.png";

class About extends React.Component {
  render() {
    return (
      <div className="banner-about container">
        <div className="row align-items-center ">
          <div className="row">
            <div className="col-lg-7 col-md-6 mb-4 mb-md-0">
              <div>
                <img className="img-about-fluid" src={bg2} alt="" />
              </div>
            </div>
            <div className="col-lg-5 col-md-6 align-self-center about-content">
              <h1>
                <span>Get Vaccine</span>
              </h1>
              <h2>
                <span>Right At Your Home</span>
              </h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Numquam illo corporis vero! Dolores fugit voluptatem reiciendis
                tempore ab molestias velit magnam illum, odio molestiae!
                Quisquam dolorem possimus provident iusto laudantium? Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Molestias sit
                error, quis, in ut, eligendi dolorum vel nisi corrupti sapiente
                quam iusto. Quis quaerat dignissimos consectetur ratione
                perferendis repellendus vel?
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
