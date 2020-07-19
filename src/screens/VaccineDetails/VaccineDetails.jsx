import React from "react";
import { Card, Row, Col } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { connect } from "react-redux";
import "./VaccineDetails.css";
import Button from "../../components/Buttons/Button";
import swal from "sweetalert";
import { fillCart } from "../../redux/actions";

class VaccineDetails extends React.Component {
  state = {
    vaccineData: {
      vaccineName: "",
      price: 0,
      ageOfDose: "",
      description: "",
      brand: "",
      image: "",
      stock: 0,
      id: 0,
    },
    cartData: [],
    cartCheck: {
      quantity: 0,
      userId: 0,
      vaccinesId: 0,
      id: 0,
    },
  };

  getQuantityInCart = (id) => {
    Axios.get(`${API_URL}/carts/thisUser`, {
      params: {
        usersId: this.props.user.id,
      },
    })
      .then((res) => {
        console.log(res.data);
        this.setState({
          cartData: res.data,
        });
        this.state.cartData.map((val) => {
          console.log(val.vaccines.id);
          if (val.vaccines.id === this.state.vaccineData.id) {
            this.setState({
              cartCheck: val,
            });
          }
        });
        console.log(this.state.cartCheck);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addToCartHandler = () => {
    Axios.get(`${API_URL}/carts/check`, {
      params: {
        vaccinesId: this.state.vaccineData.id,
        usersId: this.props.user.id,
      },
    }).then((res) => {
      // console.log(res.data);
      // console.log(this.state.cartCheck.quantity);
      // console.log(this.state.vaccineData.stock);
      if (this.state.cartCheck.quantity < this.state.vaccineData.stock) {
        if (res.data.length > 0) {
          Axios.put(
            `${API_URL}/carts/updateQuantity/${res.data[0].id}/${this.props.user.id}/${this.state.vaccineData.id}`,
            {
              quantity: res.data[0].quantity + 1,
            }
          )
            .then((res) => {
              swal(
                "Add to cart",
                "Your item has been added to your cart",
                "success"
              );
              console.log(res);
              this.props.onFillCart(this.props.user.id);
              this.getQuantityInCart();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          Axios.post(
            `${API_URL}/carts/${this.props.user.id}/${this.state.vaccineData.id}`,
            {
              quantity: 1,
            }
          )
            .then((res) => {
              console.log(res);
              swal(
                "Add to cart",
                "Your item has been added to your cart",
                "success"
              );
              this.props.onFillCart(this.props.user.id);
              this.getQuantityInCart();

              // this.props.numberOfItemInCart(this.props.user.id);
            })

            .catch((err) => {
              console.log(err);
            });
        }
        this.getQuantityInCart();
      } else {
        swal("Stock Not Enough", "can't add item anymore", "warning");
      }
    });
    console.log(this.state.vaccineData.id);
  };

  addToWishlistHandler = () => {
    Axios.get(`${API_URL}/wishlists/check`, {
      params: {
        usersId: this.props.user.id,
        vaccinesId: this.state.vaccineData.id,
      },
    }).then((res) => {
      // console.log(res.data);
      // console.log(this.props.user.id);
      // console.log(this.state.vaccineData.id);
      if (res.data.length > 0) {
        swal("Error", "The item is already exist on your wishlist", "error");
      } else {
        Axios.post(
          `${API_URL}/wishlists/${this.props.user.id}/${this.state.vaccineData.id}`,
          {
            usersId: this.props.user.id,
            vaccinesId: this.state.vaccineData.id,
          }
        )
          .then((res) => {
            console.log(res);
            swal(
              "Add to wishlist",
              "Your item has been added to your wishlist",
              "success"
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  componentDidMount() {
    this.getQuantityInCart(this.props.match.params.vaccineId);
    Axios.get(`${API_URL}/vaccines/${this.props.match.params.vaccineId}`)
      .then((res) => {
        console.log(res.data[0]);
        this.setState({ vaccineData: res.data[0] });
        this.props.onFillCart(this.props.user.id);
      })
      .catch((err) => {
        console.log(err);
      });

    // let userId = this.props.user.id;
    // this.props.numberOfItemInCart(userId);
  }

  render() {
    const {
      vaccineName,
      price,
      ageOfDose,
      description,
      brand,
      image,
    } = this.state.vaccineData;
    return (
      <div style={{ display: "block" }}>
        <div className="container-profile">
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
                      {" "}
                      {ageOfDose > 23 ? (
                        <span className="font-weight-bold">
                          {" "}
                          vaksin untuk dewasa
                        </span>
                      ) : (
                        <span className="font-weight-bold">
                          vaksin diberikan untuk usia {ageOfDose} bulan
                        </span>
                      )}
                    </h6>
                  </div>
                  <div className="mt-5 py-3 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
                        <p>{description}</p>
                      </Col>
                    </Row>
                    {this.props.user.role === "user" ? (
                      <Row className="justify-content-center">
                        <Button
                          onClick={this.addToWishlistHandler}
                          className="m-2"
                          type="contained"
                          value="buy"
                        >
                          Add To Wishlist
                        </Button>
                        {this.state.vaccineData.stock > 0 ? (
                          <Button
                            onClick={this.addToCartHandler}
                            className="m-2"
                            type="contained"
                            value="buy"
                          >
                            Add To Cart
                          </Button>
                        ) : (
                          <Button
                            // onClick={this.addToCartHandler}
                            className="m-2"
                            type="disabled"
                            value="buy"
                          >
                            Sold Out
                          </Button>
                        )}
                      </Row>
                    ) : (
                      <Row className="mt-5"></Row>
                    )}
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
  onFillCart: fillCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(VaccineDetails);
