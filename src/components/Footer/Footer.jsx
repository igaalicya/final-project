import React from "react";
import { Link } from "react-router-dom";
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
        <div class="container">
          <div class="row mb-5">
            <div class="footer-about col-md-5">
              <h2 class="footer-heading-2">About</h2>
              <p>
                Vrome provides you information on vaccines that help you prevent
                the most common diseases.
              </p>
              <div class="d-flex mt-5">
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
            <div class="col-md-2"></div>
            <div class="col-md-5">
              <h2 class="footer-heading-2">Have a Questions?</h2>
              <div class="block-23 mb-3">
                <div>
                  <p>
                    <span>
                      {" "}
                      <FontAwesomeIcon
                        className="footer-icon"
                        icon={faMapMarker}
                      />{" "}
                    </span>
                    <span class="text">
                      BSD Green Office Park, GOP 9 - G Floor, BSD City,
                      Tangerang Banten
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
                    <span class="text">(021) 5578 - 1888 </span>
                  </p>
                  <p className="footer-list">
                    <span>
                      {" "}
                      <FontAwesomeIcon
                        className="footer-icon"
                        icon={faPaperPlane}
                      />{" "}
                    </span>
                    <span class="text">info@vrome.com</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 text-center mb-3">
              {/* <p>Copyright © 2020 Vrome</p> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
