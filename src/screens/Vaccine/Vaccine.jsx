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
import { connect } from "react-redux";
import { navbarInputHandler } from "../../redux/actions";

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
    searchBarIsFocused: false,
    searcBarInput: "",
    searchValue: "",
    orderBy: "vaccineNameAsc",
  };

  onFocus = () => {
    this.setState({ searchBarIsFocused: true });
  };

  onBlur = () => {
    this.setState({ searchBarIsFocused: false });
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

  getVaccineListPerPage = (categories) => {
    this.getCountVaccines();
    if (categories === "all") {
      Axios.get(
        `${API_URL}/vaccines/page/${this.currentPage}/${this.state.orderBy}/${this.state.minPrice}/${this.state.maxPrice}`,
        {
          params: {
            vaccineName: this.state.searchValue,
          },
        }
      )
        .then((res) => {
          this.setState({ vaccinePage: res.data });
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Axios.get(
        `${API_URL}/vaccines/page/categories/${this.currentPage}/${this.state.orderBy}/${this.state.minPrice}/${this.state.maxPrice}`,
        {
          params: {
            vaccineName: this.state.searchValue,
            categoriesName: categories,
          },
        }
      )
        .then((res) => {
          this.setState({ vaccinePage: res.data });
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  getCountVaccines = () => {
    if (this.state.categoryFilter === "all") {
      Axios.get(
        `${API_URL}/vaccines/count/all/${this.state.minPrice}/${this.state.maxPrice}`,
        {
          params: {
            vaccineName: this.state.searchValue,
          },
        }
      )
        .then((res) => {
          this.setState({
            countVaccines: res.data,
          });
          console.log(this.state.countVaccines);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Axios.get(
        `${API_URL}/vaccines/count/categories/${this.state.minPrice}/${this.state.maxPrice}`,
        {
          params: {
            vaccineName: this.state.searchValue,
            categoriesName: this.state.categoryFilter,
          },
        }
      )
        .then((res) => {
          this.setState({
            countVaccines: res.data,
          });
          console.log(this.state.countVaccines);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  renderButton() {
    let arr = [];
    let j = 0;
    for (let i = 0; i < this.state.countVaccines; i++) {
      if (i % 9 === 0) {
        arr.push(
          <Button
            key={i.toString()}
            className="ml-1 btn-page"
            onClick={() => this.goToPage(i)}
          >
            {j + 1}{" "}
          </Button>
        );
        j = j + 1;
      }
    }
    return arr;
  }

  goToPage = (i) => {
    // kalo pake state gabisa langsung keganti
    this.currentPage = i;
    console.log(this.currentPage);
    this.getVaccineListPerPage(this.state.categoryFilter);
    this.currentPage = i;
  };

  renderVaccine = () => {
    return this.state.vaccinePage.map((val, idx) => {
      if (
        val.vaccineName
          .toLowerCase()
          .includes(this.props.search.searchValue.toLowerCase())
        //  && val.category.toLowerCase().includes(this.state.categoryFilter)
      ) {
        console.log(this.props.search.searchValue);
        return (
          <Link
            key={idx.toString()}
            className="vaccine-card col-md-4 col-lg-3 m-3"
            to={`/vaccineDetails/${val.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <VaccineCard data={val} className="m-5" />
          </Link>
        );
      }
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
    return this.state.categoryList.map((val, idx) => {
      const { categoryName } = val;
      return (
        <option key={idx.toString()} value={categoryName}>
          {categoryName}
        </option>
      );
    });
  };

  componentDidMount() {
    this.getVaccineList();
    this.getVaccineListPerPage(this.state.categoryFilter);
    this.getCountVaccines();
    this.getCategories();
    this.renderButton();
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
                {/* <input
                  onChange={this.props.onChangeSearch}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  className={`search-bar ${
                    this.state.searchBarIsFocused ? "active" : null
                  }`}
                  type="text"
                  placeholder="Cari produk impianmu disini"
                  className="form-control"
                /> */}
                <input
                  type="text"
                  onKeyUp={() =>
                    this.getVaccineListPerPage(this.state.categoryFilter)
                  }
                  className="form-control mr-4"
                  placeholder="search vaccine name here"
                  onChange={(e) =>
                    this.setState({ searchValue: e.target.value })
                  }
                />
              </div>
              <div className="col-lg-2 form-cols">
                <input
                  type="text"
                  className="form-control"
                  name="search"
                  placeholder="min price"
                  onKeyUp={() =>
                    this.getVaccineListPerPage(this.state.categoryFilter)
                  }
                  onChange={(e) => this.setState({ minPrice: +e.target.value })}
                />
              </div>
              <div className="col-lg-2 form-cols">
                <input
                  type="text"
                  className="form-control"
                  name="search"
                  placeholder="max price"
                  onKeyUp={() =>
                    this.getVaccineListPerPage(this.state.categoryFilter)
                  }
                  onChange={(e) =>
                    this.setState({ maxPrice: 1 * e.target.value })
                  }
                />
              </div>
              <div className="col-lg-2 form-cols">
                <select
                  value={this.state.categoryFilter}
                  onChange={(e) =>
                    this.setState({ categoryFilter: e.target.value })
                  }
                  className="form-control"
                  onClick={() =>
                    this.getVaccineListPerPage(this.state.categoryFilter)
                  }
                >
                  <option value="all">All</option>
                  {this.optionData()}
                </select>
              </div>
              <div className="col-lg-3 form-cols">
                <select
                  className="form-control"
                  value={this.state.orderBy}
                  onChange={(e) => this.setState({ orderBy: e.target.value })}
                  onClick={() =>
                    this.getVaccineListPerPage(this.state.categoryFilter)
                  }
                >
                  <option value="vaccineNameAsc">Vaccine Name (a-z)</option>
                  <option value="vaccineNameDesc">Vaccine Name (z-a)</option>
                  <option value="priceAsc">Price (low-high)</option>
                  <option value="priceDesc">Price (high-low)</option>
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

const mapStateToProps = (state) => {
  return {
    search: state.search,
  };
};

const mapDispatchToProps = {
  onChangeSearch: navbarInputHandler,
};
export default connect(mapStateToProps, mapDispatchToProps)(Vaccine);
