import React from "react";
import { Card, Row, Col } from "reactstrap";
import "./VaccineDetails.css";

class VaccineDetails extends React.Component {
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
                      <div className="vaccine-image">
                        <img
                          alt="..."
                          className="vaccine-image mt-3"
                          src="https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1527750304/ge2j5wjtigw1rdc2yvji.jpg"
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

export default VaccineDetails;
