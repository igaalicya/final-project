import React from "react";
import { Card, Row, Col } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import "./Profile.css";

class ProfileDoctor extends React.Component {
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
                          src={image}
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center mt-5">
                    <h3>{fullName}</h3>
                    <h6 className="font-weight-light">{address}</h6>
                    <h6 className="mt-4">{specialist}</h6>
                    <h6 className="text-secondary">Paramadina University</h6>
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
                        <p>{desc}</p>
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
