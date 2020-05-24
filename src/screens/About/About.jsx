import React from "react";
import { Row, Col, Button } from "reactstrap";
import "./About.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyringe } from "@fortawesome/free-solid-svg-icons/";

class About extends React.Component {
  render() {
    return (
      <div style={{ display: "block" }}>
        <div className="container-about p-5">
          <Row className="justify-content-center pt-5">
            <Col lg="9">
              <h2 className="display-3 text-white">
                <span>Get Vaccine</span>
              </h2>
              <h3 className="display-4 text-white">
                <span>Right At Your Home</span>
              </h3>
              <p className="lead text-white pt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus aliquam fuga soluta fugit corporis impedit, quos
                sed eligendi explicabo unde ea consectetur dolorem consequuntur
                voluptatem rerum amet, provident rem recusandae?
              </p>
              <div className="btn-wrapper">
                <Button className="btn-icon mb-3 mb-sm-0" color="info">
                  <FontAwesomeIcon
                    className="mr-2"
                    icon={faSyringe}
                    style={{ fontSize: 24 }}
                  />
                  <span className="btn-inner--text">Get Vaccine Now</span>
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default About;
