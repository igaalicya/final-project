import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Alert, Modal, ModalBody, ModalHeader } from "reactstrap";
import "./Cart.css";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import Button from "../../components/Buttons/Button";
import swal from "sweetalert";
import { priceFormatter } from "../../supports/helpers/formatter";
import { fillCart } from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Cart extends React.Component {
  state = {
    dateCalendar: new Date(),
    cartData: [],
    doctorList: [],
    modalOpen: false,
    // nyimpan id transac
    id: 0,
    checkoutData: {
      userId: 0,
      grandTotalPrice: 0,
      status: "pending",
      transactionDate: "",
      completionDate: "",
      doctorId: 0,
    },
    doctorId: 1,
    doctorName: "",
    delivery: 0,
    deliveryCost: 0,
    shipping: "jabodetabek",
    vaccineDate: new Date(),
    // startDate: new Date(),
  };

  // inputHandler = (e, field) => {
  //   this.setState({ [field]: e.target.value });
  //   this.deliveryCostHandler();
  // };

  handleChange(date) {
    this.setState({
      vaccineDate: date,
    });
  }

  componentDidMount() {
    this.getCartData();
    this.getDoctorList();
    this.optionData();
    this.deliveryCostHandler();
    this.props.onFillCart(this.props.user.id);
    // this.props.numberOfItemInCart(this.props.user.id);
  }

  getCartData = () => {
    let grandTotalPrice = 0;

    Axios.get(`${API_URL}/carts`, {
      params: {
        userId: this.props.user.id,
        _expand: "vaccine",
      },
    })
      .then((res) => {
        console.log(res.data);
        res.data.map((val) => {
          grandTotalPrice += val.quantity * val.vaccine.price;
          return grandTotalPrice;
        });

        this.setState({
          cartData: res.data,
          checkoutData: {
            ...this.state.checkoutData,
            userId: this.props.user.id,
            grandTotalPrice: grandTotalPrice + +this.state.delivery,
            transactionDate: this.state.dateCalendar.toLocaleDateString(),
            doctorId: this.state.doctorId,
            // items: res.data
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getDoctorList = () => {
    Axios.get(`${API_URL}/doctors`)
      .then((res) => {
        this.setState({ doctorList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  optionData = () => {
    return this.state.doctorList.map((val) => {
      const { fullName, id } = val;
      return <option value={id}>{fullName}</option>;
    });
  };

  renderCart = () => {
    return this.state.cartData.map((val, idx) => {
      return (
        <tr>
          <td>{idx + 1}</td>
          <td>
            <img
              alt=""
              src={val.vaccine.image}
              style={{ width: "100%", objectFit: "contain", height: "100px" }}
            />
          </td>
          <td>{val.vaccine.vaccineName}</td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(val.vaccine.price)}
          </td>
          <td>{val.quantity}</td>
          <td align="center">
            <Button type="outlined" onClick={() => this.deleteHandler(val.id)}>
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  };

  deleteHandler = (id) => {
    Axios.delete(`${API_URL}/carts/${id}`)
      .then((res) => {
        console.log(res);
        this.getCartData();
        this.props.onFillCart(this.props.user.id);
        // this.props.numberOfItemInCart(this.props.user.id);
      })
      .catch((err) => {
        console.log("gagal");
      });
  };

  deliveryCostHandler = () => {
    if (this.state.delivery === "jabodetabek") {
      this.setState({ deliveryCost: 100000 });
    } else if (this.state.delivery === "non") {
      this.setState({ deliveryCost: 50000 });
    }
  };

  checkoutBtnHandler = () => {
    this.setState({
      modalOpen: true,
    });
  };

  checkoutHandlder = () => {
    console.log(this.state.deliveryCost);
    console.log(this.state.delivery);
    const { cartData } = this.state;
    let totalPrice;
    return cartData.map((val, idx) => {
      const { quantity, vaccine } = val;
      totalPrice = quantity * vaccine.price;
      return (
        <>
          <tr>
            <td>{idx + 1}</td>
            <td>{vaccine.vaccineName}</td>
            <td>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(vaccine.price)}
            </td>
            <td>{quantity}</td>
            <td>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(totalPrice)}
            </td>
          </tr>
        </>
      );
    });
  };

  confirmPayment = () => {
    Axios.post(`${API_URL}/transactions`, {
      ...this.state.checkoutData,
      grandTotalPrice: this.renderTotalPrice(),
      doctorId: this.state.doctorId,
    })
      .then((res) => {
        this.state.cartData.map((val) => {
          Axios.post(`${API_URL}/transactionDetails`, {
            transactionId: res.data.id,
            vaccineId: val.vaccineId,
            price: val.vaccine.price,
            quantity: val.quantity,
            totalPrice: val.vaccine.price * val.quantity,
          })
            .then((res) => {
              console.log(res);
              swal("Thank you!", "Your Transaction is Success", "success");
              this.setState({
                modalOpen: false,
                checkoutData: {
                  userId: 0,
                  grandTotalPrice: 0,
                  status: "pending",
                  transactionDate: "",
                  completionDate: "",
                  doctorId: 0,
                },
              });
              // empty cart
              this.state.cartData.map((val) => {
                return this.deleteHandler(val.id);
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
        console.log(res);
        swal("Success", "your transaction is success", "success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  checkboxHandler = (e, idx) => {
    const { checked } = e.target;
    if (checked) {
      this.setState({
        items: [...this.state.cartData, idx],
      });
    } else {
      this.setState({
        items: [...this.state.cartData.filter((val) => val !== idx)],
      });
    }
  };

  renderSubTotalPrice = () => {
    let totalPrice = 0;

    this.state.cartData.forEach((val) => {
      const { quantity, vaccine } = val;
      const { price } = vaccine;

      totalPrice += quantity * price;
    });

    return totalPrice;
  };

  // renderDoctor = () => {
  //   Axios.get(`${API_URL}/doctors/${this.state.doctorId}`)
  //     .then((res) => {
  //       console.log(res.data.fullName);
  //       // console.log(JSON.parse(res.data).fullName);
  //       this.setState({ doctorData: res.data });
  //       // res.data.map((val) => {
  //       //   const { fullName } = val;
  //       //   return fullName;
  //       // });
  //       // this.setState({ doctorName: res.data.fullName });
  //       // return res.data.fullName;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  renderDoctorName = () => {
    return this.state.doctorList.map((val) => {
      if (val.id == this.state.doctorId) {
        return val.fullName;
      }
    });
  };

  renderShippingPrice = () => {
    switch (this.state.shipping) {
      case "jabodetabek":
        return priceFormatter(100000);
      case "non":
        return priceFormatter(50000);
      default:
        return priceFormatter(100000);
    }
  };

  renderTotalPrice = () => {
    let totalPrice = 0;

    this.state.cartData.forEach((val) => {
      const { quantity, vaccine } = val;
      const { price } = vaccine;

      totalPrice += quantity * price;
    });

    let shippingPrice = 0;

    switch (this.state.shipping) {
      case "jabodetabek":
        shippingPrice = 100000;
        break;
      case "non":
        shippingPrice = 50000;
        break;
      default:
        shippingPrice = 100000;
    }

    return totalPrice + shippingPrice;
  };

  render() {
    return (
      <div className="container cart-container">
        <caption className="p-3">
          <h2>Cart</h2>
        </caption>
        {this.state.cartData.length > 0 ? (
          <div className="container">
            <table className="admin-table text-center">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Image</th>
                  <th>vaccine Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{this.renderCart()}</tbody>
            </table>
            <div className="cart-card">
              <div className="cart-card-head p-4">Order Summary</div>
              <div className="cart-card-body p-4">
                <div className="d-flex justify-content-between my-2">
                  <div>Subtotal</div>
                  <strong>{priceFormatter(this.renderSubTotalPrice())}</strong>
                </div>
                <div className="d-flex justify-content-between my-2">
                  <div>Delivery Fee</div>
                  <strong>{this.renderShippingPrice()}</strong>
                </div>
                <div className="d-flex justify-content-between my-2 align-items-center">
                  <label>Address</label>
                  <select
                    onChange={(e) =>
                      this.setState({ shipping: e.target.value })
                    }
                    className="form-control w-50"
                  >
                    <option value="jabodetabek">Jabodetabek</option>
                    <option value="non">Non-Jabodetabek</option>
                  </select>
                </div>
                <div className="d-flex justify-content-between my-2 align-items-center">
                  <label>Doctor</label>
                  <select
                    value={this.state.doctorId}
                    onChange={(e) =>
                      this.setState({ doctorId: e.target.value })
                    }
                    className="form-control w-50"
                  >
                    {this.optionData()}
                  </select>
                  {console.log(this.state.doctorId)}
                </div>
                <div className="d-flex justify-content-between my-2 ">
                  <label>Tanggal</label>
                  <input
                    type="date"
                    className="form-control w-50"
                    name="date"
                    placeholder="Pick a date"
                  />
                </div>

                <div className="cart-card-foot p-4">
                  <div className="d-flex justify-content-between my-2">
                    <div>Total</div>
                    <div>{priceFormatter(this.renderTotalPrice())}</div>
                  </div>
                </div>
                <input
                  onClick={this.checkoutBtnHandler}
                  type="button"
                  value="Checkout"
                  className="btn btn-success btn-block mt-3"
                />
              </div>
            </div>
          </div>
        ) : (
          <Alert>
            Your cart is empty! <Link to="/">Go shopping</Link>
          </Alert>
        )}
        <Modal
          toggle={this.toggleModal}
          isOpen={this.state.modalOpen}
          size="lg"
          centered
        >
          <ModalHeader toggle={this.toggleModal}>
            <caption>
              <h3>Checkout</h3>
            </caption>
          </ModalHeader>
          <ModalBody>
            <div className="row d-flex justify-content-center">
              <div className="col-12 align-items-center">
                <h5 className="mt-3">Customer : {this.props.user.fullName}</h5>
                <br />
                <h5 className="mt-3">Doctor: {this.renderDoctorName()}</h5>
                <table className="admin-table text-center">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Vaccine Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.checkoutHandlder()}

                    <tr colSpan={2}>
                      Delivery Cost : {this.renderShippingPrice()}
                    </tr>
                    <tr colSpan={3}>
                      grand Total Price :
                      {priceFormatter(this.renderTotalPrice())}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="col-3 mt-3 offset-1">
                <Button
                  className="w-100"
                  onClick={this.toggleModal}
                  type="outlined"
                >
                  Cancel
                </Button>
              </div>
              <div className="col-3 mt-3">
                <Button
                  className="w-100"
                  onClick={this.confirmPayment}
                  type="contained"
                >
                  Cofirm
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
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
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
