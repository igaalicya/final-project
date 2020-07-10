import React from "react";
import "./Vaccine.css";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { Link } from "react-router-dom";
import VaccineCard from "../../components/Cards/VaccineCard";
// import Button from "../../components/Buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";

class Vaccine extends React.Component {
  state = {
    vaccineList: [],
    modalOpen: false,
    currentPage: 0,
    countPages: 0,
  };

  getVaccineList = () => {
    Axios.get(`${API_URL}/vaccines`)
      .then((res) => {
        this.setState({ vaccineList: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderVaccine = () => {
    return this.state.vaccineList.map((val) => {
      console.log(val);
      return (
        <Link
          className="vaccine-card col-md-4 col-lg-3 m-3"
          to={`/vaccineDetails/${val.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <VaccineCard data={val} className="m-5" />
        </Link>
      );
    });
  };

  componentDidMount() {
    this.getVaccineList();
  }

  render() {
    const { currentPage, countPages } = this.state;
    return (
      <div>
        <div className="vaccine-area">
          <div className="container p-0">
            <div className="row justify-content-center mb-5 pb-2">
              <div className="col-md-8 text-center">
                <h2 className="mb-4 font-weight-bold">Vaccine</h2>
                <p>
                  immunisations are the best tool to prevent the transmission of
                  diseases. it can be live attenuated immunisations and
                  inactivated immunisations. Both are designed to stimulate the
                  immune system without causing disease.
                </p>
              </div>
            </div>
            <div className="row justify-content-center">
              {this.renderVaccine()}
            </div>
            <div className="mt-5 row justify-content-center">
              {/* <Button className="btn-page" disabled>
                <FontAwesomeIcon
                  icon={faAngleDoubleLeft}
                  style={{ fontSize: 14 }}
                />
              </Button> */}
              <Button className="ml-1 btn-page" disabled>
                <FontAwesomeIcon icon={faAngleLeft} style={{ fontSize: 14 }} />
              </Button>
              <Button className="ml-1 btn-page">1</Button>
              <Button className="ml-1 btn-page" disabled>
                2
              </Button>
              <Button className="ml-1 btn-page" disabled>
                3
              </Button>
              <Button className="ml-1 btn-page" disabled>
                <FontAwesomeIcon icon={faAngleRight} style={{ fontSize: 14 }} />
              </Button>
              {/* <Button className="ml-1 btn-page" disabled>
                <FontAwesomeIcon
                  icon={faAngleDoubleRight}
                  style={{ fontSize: 14 }}
                />
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Vaccine;
