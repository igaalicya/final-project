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
  currentPage = 0;
  state = {
    categoryList: [],
    vaccineList: [],
    vaccinePage: [],
    modalOpen: false,
    currentPage: 0,
    countPages: 0,
    countVaccines: 0,
    categoryFilter: "all",
    minPrice: 0,
    maxPrice: 999999999,
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

  getVaccineListPerPage = () => {
    Axios.get(`${API_URL}/vaccines/page/${this.currentPage}`)
      .then((res) => {
        this.setState({ vaccinePage: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getCountVaccines = () => {
    // if (this.state.categoryFilter == "all") {
    Axios.get(`${API_URL}/vaccines/count/all`)
      .then((res) => {
        this.setState({
          countVaccines: res.data,
        });
        console.log(this.state.countVaccines);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderButton() {
    let arr = [];
    let j = 0;
    for (let i = 0; i < this.state.countVaccines; i++) {
      if (i % 9 == 0) {
        arr.push(
          <Button className="ml-1 btn-page" onClick={() => this.goToPage(i)}>
            {j + 1}{" "}
          </Button>
        );
        j = j + 1;
      }
    }
    // console.log(arr);
    return arr;
  }

  goToPage = (i) => {
    // kalo pake state gabisa langsung keganti
    this.currentPage = i;
    console.log(this.currentPage);
    this.getVaccineListPerPage();
    this.currentPage = i;
  };

  renderVaccine = () => {
    return this.state.vaccinePage.map((val) => {
      // console.log(val);
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

  getCategories = () => {
    Axios.get(`${API_URL}/categories`)
      .then((res) => {
        this.setState({ categoryList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  optionData = () => {
    return this.state.categoryList.map((val) => {
      const { categoryName, id } = val;
      return <option value={id}>{categoryName}</option>;
    });
  };

  componentDidMount() {
    this.getVaccineList();
    this.getVaccineListPerPage();
    this.getCountVaccines();
    this.getCategories();
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
            <div className="row form-wrap">
              <div className="col-lg-3 form-cols">
                <input
                  type="text"
                  className="form-control"
                  name="search"
                  placeholder="search by vaccine name"
                />
              </div>
              <div className="col-lg-2 form-cols">
                <input
                  type="text"
                  className="form-control"
                  name="search"
                  placeholder="min price"
                />
              </div>
              <div className="col-lg-2 form-cols">
                <input
                  type="text"
                  className="form-control"
                  name="search"
                  placeholder="maks price"
                />
              </div>
              <div className="col-lg-3 form-cols">
                <select
                  value={this.state.doctorId}
                  onChange={(e) => this.setState({ doctorId: e.target.value })}
                  className="form-control"
                >
                  {this.optionData()}
                </select>
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
              {/* <Button className="ml-1 btn-page">
                <FontAwesomeIcon icon={faAngleLeft} style={{ fontSize: 14 }} />
              </Button> */}
              {this.renderButton()}
              {/* <Button className="ml-1 btn-page">
                <FontAwesomeIcon icon={faAngleRight} style={{ fontSize: 14 }} />
              </Button> */}
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
