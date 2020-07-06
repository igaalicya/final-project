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
                Vromo provides a comprehensive services performed by a specially
                trained medical team on vaccinations that help you prevent the
                most common diseases. We are continually updates our facilities
                and staff qualification. In improving the quality of vaccination
                services, Vrome applies values that prioritize patient’s safety,
                quality info to patients and proper medical records.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
