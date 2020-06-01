import React from "react";
import { Card, Row, Col } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import "./VaccineDetails.css";
import Button from "../../components/Buttons/Button";

class VaccineDetails extends React.Component {
  state = {
    vaccineData: {
      vaccineName: "",
      price: 0,
      ageOfDose: "",
      desc: "",
      brand: "",
      image: "",
      id: 0,
    },
  };

  componentDidMount() {
    Axios.get(`${API_URL}/vaccines/${this.props.match.params.vaccineId}`)
      .then((res) => {
        this.setState({ vaccineData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      vaccineName,
      price,
      ageOfDose,
      desc,
      brand,
      image,
    } = this.state.vaccineData;
    return (
      <div style={{ display: "block" }}>
        <div className="container-profile p-5">
          <Row className="justify-content-center pt-5">
            <Col lg="8">
              <Card>
                <div className="px-4">
                  <Row className="justify-content-center">
                    <div className="vaccine-image">
                      <img
                        alt="..."
                        className="vaccine-image mt-3"
                        src={image}
                      />
                    </div>
                  </Row>
                  <div className="text-center mt-5">
                    <h3 className="font-weight-bold">{vaccineName}</h3>
                    <h6 className="text-secondary">{brand}</h6>
                    <h6 className="font-weight-light">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(price)}
                    </h6>
                    <h6 className="mt-4">
                      vaksin ini untuk usia{" "}
                      <span className="font-weight-bold">
                        {ageOfDose} bulan
                      </span>
                    </h6>
                  </div>
                  <div className="mt-5 py-3 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
                        <p>
                          {desc}
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Alias, porro, tenetur fugit ea velit quo
                          obcaecati qui, perferendis soluta aut eaque facere
                          nihil quod et quia. Earum ratione reprehenderit
                          assumenda.
                        </p>
                      </Col>
                    </Row>
                    <Row className="justify-content-center">
                      <Button
                        onClick=""
                        className="m-2"
                        type="contained"
                        value="buy"
                      >
                        BUY
                      </Button>
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
