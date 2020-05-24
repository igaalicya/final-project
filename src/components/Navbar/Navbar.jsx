import React from "react";
// import Logo from "../../assets/images/logo/logo.png";
import { Link } from "react-router-dom";
import "./Navbar.css";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons/";
// import { Button } from "reactstrap";
import Button from "../Buttons/Button.tsx";

class MyNavbar extends React.Component {
  render() {
    return (
      <div className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Vrome
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
          >
            <span className="oi oi-menu"></span> Menu
          </button>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <span>Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  <span>About</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/vaccine" className="nav-link">
                  <span>Vaccine</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/doctors" className="nav-link">
                  <span>Doctors</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  {/* <span>
                    <FontAwesomeIcon icon={faUser} style={{ fontSize: 24 }} />
                    Iga
                  </span> */}
                  <Button type="contained" className="mx-3">
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Login
                    </Link>
                  </Button>
                </Link>
              </li>
              {/* <li className="nav-item cta mr-md-2">
                <Link to="/" className="nav-link">
                  Appointment
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default MyNavbar;
