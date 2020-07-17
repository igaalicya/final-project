import React from "react";
import DatePicker from "react-date-picker";
// import DatePicker from "react-datepicker";
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
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import "react-date-picker/dist/entry.nostyle";

class Cart extends React.Component {
  state = {
    dateCalendar: new Date(),
    cartData: [],
    doctorList: [],
    modalOpen: false,
    // nyimpan id transac
    id: 0,
    checkoutData: {
      usersId: 0,
      grandTotalPrice: 0,
      status: "pending",
      transactionDate: "",
      completionDate: "",
      doctorId: 0,
      vaccineDate: "",
    },
    doctorId: 1,
    doctorName: "",
    delivery: 0,
    shipping: "express",
    vaccineDate: new Date(),
    // startDate: new Date(),
  };

  handleChange = this.handleChange.bind(this);
  handleChange(date) {
    this.setState({
      vaccineDate: date,
    });
    console.log(this.state.vaccineDate.toLocaleDateString());
  }

  componentDidMount() {
    this.getCartData();
    this.getDoctorList();
    this.optionData();
    this.props.onFillCart(this.props.user.id);
    this.renderDoctorName();
  }

  getCartData = () => {
    let grandTotalPrice = 0;

    Axios.get(`${API_URL}/carts/thisUser`, {
      params: {
        usersId: this.props.user.id,
        // _expand: "vaccine",
      },
    })
      .then((res) => {
        console.log(res.data);
        console.log(this.state.vaccineDate.toLocaleDateString());
        res.data.map((val) => {
          grandTotalPrice += val.quantity * val.vaccines.price;
          return grandTotalPrice;
        });

        this.setState({
          cartData: res.data,
          checkoutData: {
            ...this.state.checkoutData,
            usersId: this.props.user.id,
            grandTotalPrice: grandTotalPrice + +this.state.delivery,
            transactionDate: this.state.dateCalendar.toLocaleDateString(),
            doctorId: this.state.doctorId,
            // vaccineDate: this.state.vaccineDate.toLocaleDateString(),
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(this.state.cartData);
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
      return (
        <option value={id} key={id.toString()}>
          {fullName}
        </option>
      );
    });
  };

  renderCart = () => {
    return this.state.cartData.map((val, idx) => {
      return (
        <tr key={idx.toString()}>
          <td>{idx + 1}</td>
          <td>
            <img
              alt=""
              src={val.vaccines.image}
              style={{ width: "100%", objectFit: "contain", height: "100px" }}
            />
          </td>
          <td>{val.vaccines.vaccineName}</td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(val.vaccines.price)}
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
      })
      .catch((err) => {
        console.log("gagal");
      });
  };

  checkoutBtnHandler = () => {
    this.setState({
      modalOpen: true,
      checkoutData: {
        ...this.state.checkoutData,
        vaccineDate: this.state.vaccineDate.toLocaleDateString(),
      },
    });
    this.renderDoctorName();
  };

  checkoutHandlder = () => {
    // console.log(this.state.delivery);
    const { cartData } = this.state;
    let totalPrice;
    return cartData.map((val, idx) => {
      const { quantity, vaccines } = val;

      totalPrice = quantity * vaccines.price;
      return (
        <tr key={idx.toString()}>
          <td>{idx + 1}</td>
          <td>{vaccines.vaccineName}</td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(vaccines.price)}
          </td>
          <td>{quantity}</td>
          <td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(totalPrice)}
          </td>
        </tr>
      );
    });
  };

  confirmPayment = () => {
    Axios.post(
      `${API_URL}/transactions/${this.state.doctorId}/${this.props.user.id}`,
      {
        ...this.state.checkoutData,
        grandTotalPrice: this.renderTotalPrice(),
        doctorId: this.state.doctorId,
      }
    )
      .then((res) => {
        this.renderDoctorName();
        this.state.cartData.map((val) => {
          console.log(res.data.id);

          if (val.vaccines.stock >= val.quantity) {
            Axios.post(
              `${API_URL}/transactions/details/${val.vaccines.id}/${res.data.id}`,
              {
                // transactionsId: res.data.id,
                // vaccinesId: val.vaccines.id,
                price: val.vaccines.price,
                quantity: val.quantity,
                totalPrice: val.vaccines.price * val.quantity,
              }
            )
              .then((res) => {
                swal("Thank you!", "Your Transaction is Success", "success");
                if (val.vaccines.stock >= val.quantity) {
                  console.log(val.vaccines.stock);
                  // console.log(val.vaccines.stock - val.quantity);
                  Axios.put(`${API_URL}/vaccines/checkout/${val.vaccines.id}`, {
                    stock: val.vaccines.stock - val.quantity,
                    id: val.id,
                  })
                    .then((res) => {
                      console.log(res);
                      swal("Success", "your transaction is success", "success");
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  swal("Warning", "stock is not enough", "warning");
                  this.setState({
                    modalOpen: false,
                  });
                }
                this.setState({
                  modalOpen: false,
                  checkoutData: {
                    usersId: 0,
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
          } else {
            swal("Warning", "stock is not enough", "warning");
            this.setState({
              modalOpen: false,
            });
          }
        });
        console.log(res);
        // swal("Success", "your transaction is success", "success");
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
      const { quantity, vaccines } = val;
      const { price, stock } = vaccines;

      if (quantity <= stock) {
        totalPrice += quantity * price;
      }
    });

    return totalPrice;
  };

  renderDoctorName = () => {
    return this.state.doctorList.map((val) => {
      if (val.id === this.state.doctorId) {
        return val.fullName;
      }
    });
  };

  renderShippingPrice = () => {
    switch (this.state.shipping) {
      case "express":
        return priceFormatter(100000);
      case "standard":
        return priceFormatter(50000);
      default:
        return priceFormatter(100000);
    }
  };

  renderTotalPrice = () => {
    let totalPrice = 0;

    this.state.cartData.forEach((val) => {
      const { quantity, vaccines } = val;
      const { price, stock } = vaccines;

      if (quantity <= stock) {
        totalPrice += quantity * price;
      }
    });

    let shippingPrice = 0;

    switch (this.state.shipping) {
      case "express":
        shippingPrice = 100000;
        break;
      case "standard":
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
                  <label>Delivery</label>
                  <select
                    onChange={(e) =>
                      this.setState({ shipping: e.target.value })
                    }
                    className="form-control w-50"
                  >
                    <option value="express">express</option>
                    <option value="standard">standard</option>
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
                  <label>Date</label>
                  {/* <input
                    type="date"
                    className="form-control w-50"
                    name="date"
                    placeholder="Pick a date"
                    onChange={(e) => {
                      this.handleChange(e, "vaccineDate");
                    }}
                  /> */}
                  <DatePicker
                    customStyles={{ dateInput: { borderWidth: 0 } }}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      border: "none",
                    }}
                    className="form-control w-50"
                    onChange={this.handleChange}
                    value={this.state.vaccineDate}
                  />
                  {/* {console.log(this.state.vaccineDate.toLocaleDateString())} */}
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
                {/* <h5 className="mt-3">Doctor: {this.renderDoctorName()}</h5> */}
                <table className="admin-table text-center mt-3">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Vaccine Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>{this.checkoutHandlder()}</tbody>
                  <tfoot>
                    <tr colSpan={3}>
                      Delivery Cost : {this.renderShippingPrice()}
                    </tr>
                    <tr colSpan={3}>
                      grand Total Price :
                      {priceFormatter(this.renderTotalPrice())}
                    </tr>
                  </tfoot>
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
