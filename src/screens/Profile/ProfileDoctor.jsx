import React from "react";
import { Card, Row, Col } from "reactstrap";
import "./Profile.css";

class ProfileDoctor extends React.Component {
  render() {
    return (
      <div style={{ display: "block" }}>
        <div className="container-profile p-5">
          <Row className="justify-content-center pt-5">
            <Col lg="8">
              <Card>
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col sm="6" lg="3">
                      <div className="profile-image">
                        <img
                          alt="..."
                          className="profile-image rounded mt-3"
                          src="https://d1ojs48v3n42tp.cloudfront.net/personnels/242073_18-2-2020_16-38-29.jpg"
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center mt-5">
                    <h3>dr. Arifin Kurniawan Kashmir, Sp.A</h3>
                    <h6 className="font-weight-light">RS. Eka Hospital</h6>
                    <h6 className="mt-4">Pediatrician</h6>
                    <h6 className="text-secondary">Paramadina University</h6>
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Cupiditate nemo commodi consequuntur illum
                          accusamus voluptates doloribus ducimus soluta?
                          Deleniti distinctio cum dolore. Rerum maxime fugiat
                          quas, sed deleniti eius voluptates.
                        </p>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default ProfileDoctor;
