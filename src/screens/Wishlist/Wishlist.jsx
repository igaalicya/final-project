import React from "react";
import { connect } from "react-redux";
import { Alert } from "reactstrap";
import "./Wishlist.css";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import Button from "../../components/Buttons/Button";
import { fillCart } from "../../redux/actions";
import "react-datepicker/dist/react-datepicker.css";

class Wishlist extends React.Component {
  state = {
    dateCalendar: new Date(),
    wishlistData: [],
    doctorList: [],
    modalOpen: false,
    // nyimpan id transac
    id: 0,
  };

  inputHandler = (e, field) => {
    this.setState({ [field]: e.target.value });
    this.deliveryCostHandler();
  };

  componentDidMount() {
    this.getwishlistData();
    this.props.onFillCart(this.props.user.id);
    // this.props.numberOfItemInCart(this.props.user.id);
  }

  getwishlistData = () => {
    Axios.get(`${API_URL}/wishlists/thisUser`, {
      params: {
        usersId: this.props.user.id,
        // _expand: "vaccine",
      },
    })
      .then((res) => {
        console.log(res.data);
        this.setState({
          wishlistData: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderWishlist = () => {
    return this.state.wishlistData.map((val, idx) => {
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
    Axios.delete(`${API_URL}/wishlists/${id}`)
      .then((res) => {
        console.log(res);
        this.getwishlistData();
        this.props.onFillCart(this.props.user.id);
        // this.props.numberOfItemInCart(this.props.user.id);
      })
      .catch((err) => {
        console.log("gagal");
      });
  };

  checkoutBtnHandler = () => {
    this.setState({
      modalOpen: true,
    });
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  render() {
    return (
      <div className="container cart-container">
        <caption className="p-3">
          <h2>Wishlist</h2>
        </caption>
        {this.state.wishlistData.length > 0 ? (
          <div className="container">
            <table className="admin-table text-center">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Image</th>
                  <th>vaccine Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{this.renderWishlist()}</tbody>
            </table>
          </div>
        ) : (
          <Alert>Your Wishlist is empty!</Alert>
        )}
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
export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
