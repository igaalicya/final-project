import React from "react";
import { Card, Row, Col } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { connect } from "react-redux";
import "./VaccineDetails.css";
import Button from "../../components/Buttons/Button";
import swal from "sweetalert";
import { countCartHandler } from "../../redux/actions";

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

  addToCartHandler = () => {
    console.log(this.state.vaccineData.id);
    Axios.get(`${API_URL}/carts`, {
      params: {
        vaccineId: this.state.vaccineData.id,
        userId: this.props.user.id,
      },
    }).then((res) => {
      if (res.data.length > 0) {
        Axios.patch(`${API_URL}/carts/${res.data[0].id}`, {
          quantity: res.data[0].quantity + 1,
        })
          .then((res) => {
            swal(
              "Add to cart",
              "Your item has been added to your cart",
              "success"
            );
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        Axios.post(`${API_URL}/carts`, {
          userId: this.props.user.id,
          vaccineId: this.state.vaccineData.id,
          quantity: 1,
        })
          .then((res) => {
            console.log(res);
            swal(
              "Add to cart",
              "Your item has been added to your cart",
              "success"
            );

            this.props.numberOfItemInCart(this.props.user.id);
          })

          .catch((err) => {
            console.log(err);
          });
      }
    });
    console.log(this.state.vaccineData.id);
  };

  componentDidMount() {
    Axios.get(`${API_URL}/vaccines/${this.props.match.params.vaccineId}`)
      .then((res) => {
        this.setState({ vaccineData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });

    let userId = this.props.user.id;
    this.props.numberOfItemInCart(userId);
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
                        onClick={this.addToCartHandler}
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
    cart: state.cart,
  };
};

const mapDispatchToProps = {
  numberOfItemInCart: countCartHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(VaccineDetails);
