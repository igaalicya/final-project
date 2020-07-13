import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logos from "../../assets/images/logo/logos.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import "./Navbar.css";
import Button from "../Buttons/Button";
import { logoutHandler } from "../../redux/actions";
// import { countCartHandler } from "../../redux/actions/cart";

const CircleBg = ({ children }) => {
  return <div className="circle-bg">{children}</div>;
};

class MyNavbar extends React.Component {
  state = {
    searchBarIsFocused: false,
    searcBarInput: "",
    dropdownOpen: false,
  };

  inputHandler = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  onFocus = () => {
    this.setState({ searchBarIsFocused: true });
  };

  onBlur = () => {
    this.setState({ searchBarIsFocused: false });
  };

  onLogout = () => {
    this.props.onLogout();
    // this.forceUpdate();
  };

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  render() {
    return (
      <div className="d-flex flex-row justify-content-between align-items-center py-4 navbar-container navbar">
        <div className="logo-text">
          <Link className="navbar-brand" to="/">
            <img className="navbar-logo" src={logos} alt="" />
          </Link>
        </div>
        {/* <div
          style={{ flex: 1 }}
          className="px-5 d-flex flex-row justify-content-start"
        >
          <input
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            className={`search-bar ${
              this.state.searchBarIsFocused ? "active" : null
            }`}
            type="text"
            placeholder="Cari produk impianmu disini"
            onChange={(e) => {
              this.props.searchProduct(e.target.value);
            }}
          />
        </div> */}
        <div className="d-flex flex-row align-items-center">
          <Link
            to="/about"
            className="nav-link"
            style={{ color: "white", textDecoration: "none" }}
          >
            <span>About</span>
          </Link>
          <Link
            to="/vaccine"
            className="nav-link"
            style={{ color: "white", textDecoration: "none" }}
          >
            <span>Vaccine</span>
          </Link>
          <Link
            to="/doctors"
            className="nav-link"
            style={{ color: "white", textDecoration: "none" }}
          >
            <span>Doctors</span>
          </Link>
          {console.log(this.props.user.username)}
          {this.props.user.username ? (
            <>
              {this.props.user.role === "admin" ? (
                <Dropdown
                  toggle={this.toggleDropdown}
                  isOpen={this.state.dropdownOpen}
                >
                  <DropdownToggle tag="div" className="d-flex">
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{ fontSize: 24, color: "white" }}
                    />
                    <p className="text-white ml-1 mr-4 m-0">
                      {this.props.user.username}
                    </p>
                  </DropdownToggle>
                  <DropdownMenu className="mt-2 navbar-dropdown">
                    <DropdownItem>
                      <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        to="/admin/vaccine"
                      >
                        Vaccine
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        to="/admin/package"
                      >
                        Vaccine Package
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        to="/admin/categories"
                      >
                        Categories
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        to="/admin/members"
                      >
                        Members
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        to="/admin/doctors"
                      >
                        Doctors
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        to="/admin/transaction"
                      >
                        Transactions
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        to="/admin/report"
                      >
                        Report
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <>
                  <Dropdown
                    toggle={this.toggleDropdown}
                    isOpen={this.state.dropdownOpen}
                  >
                    <DropdownToggle tag="div" className="d-flex">
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{ fontSize: 24, color: "white" }}
                      />
                      <span className="text-white ml-1 mr-3">
                        {this.props.user.username}
                      </span>
                    </DropdownToggle>
                    <DropdownMenu className="nav-dropdown mt-2">
                      <DropdownItem>
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to="/profileUser"
                        >
                          Profile
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to="/changePassword"
                        >
                          Change Password
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to="/wishlist"
                        >
                          Wishlist
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to="/transaction"
                        >
                          Transaction
                        </Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Link
                    className="d-flex flex-row"
                    to="/cart"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={faShoppingCart}
                      style={{ fontSize: 24, color: "white" }}
                    />
                    <CircleBg>
                      <small style={{ color: "#3C64B1", fontWeight: "bold" }}>
                        {this.props.user.cartItems}
                      </small>
                    </CircleBg>
                  </Link>
                </>
              )}

              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/login"
              >
                <Button
                  className="ml-3"
                  type="contained"
                  value="Logout"
                  onClick={this.onLogout}
                >
                  Logout
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Button className="mr-3" type="textual">
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/login"
                >
                  Sign in
                </Link>
              </Button>
              <Button type="contained">
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/register"
                >
                  Sign up
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = {
  onLogout: logoutHandler,
};
export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);
