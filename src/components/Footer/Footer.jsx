import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarker,
  faPhone,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="container">
          <div className="row mb-5">
            <div className="footer-about col-md-5">
              <h2 className="footer-heading-2">About</h2>
              <p>
                Vrome provides you information on vaccines that help you prevent
                the most common diseases.
              </p>
              <div className="d-flex mt-5">
                <div>
                  <a href="https://twitter.com/">
                    <span>
                      {" "}
                      <FontAwesomeIcon
                        className="footer-icon-socmed"
                        icon={faTwitter}
                      />{" "}
                    </span>
                  </a>
                </div>
                <div>
                  <a href="https://www.instagram.com/?hl=id">
                    <span>
                      {" "}
                      <FontAwesomeIcon
                        className="footer-icon-socmed"
                        icon={faInstagram}
                      />{" "}
                    </span>
                  </a>
                </div>
                <div>
                  <a href="https://www.youtube.com/">
                    <span>
                      {" "}
                      <FontAwesomeIcon
                        className="footer-icon-socmed"
                        icon={faYoutube}
                      />{" "}
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-5">
              <h2 className="footer-heading-2">Have a Questions?</h2>
              <div className="block-23 mb-3">
                <div>
                  <p>
                    <span>
                      {" "}
                      <FontAwesomeIcon
                        className="footer-icon"
                        icon={faMapMarker}
                      />{" "}
                    </span>
                    <span className="text">
                      BSD Green Office Park, GOP 9 - G Floor, BSD City
                    </span>
                  </p>
                  <p>
                    <span>
                      {" "}
                      <FontAwesomeIcon
                        className="footer-icon"
                        icon={faPhone}
                      />{" "}
                    </span>
                    <span className="text">(021) 5578 - 1888 </span>
                  </p>
                  <p className="footer-list">
                    <span>
                      {" "}
                      <FontAwesomeIcon
                        className="footer-icon"
                        icon={faPaperPlane}
                      />{" "}
                    </span>
                    <span className="text">info@vrome.com</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center mb-3">
              {/* <p>Copyright © 2020 Vrome</p> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
