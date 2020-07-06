import React from "react";
import "./Vaccine.css";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { Link } from "react-router-dom";
import VaccineCard from "../../components/Cards/VaccineCard";

class Vaccine extends React.Component {
  state = {
    vaccineList: [],
    modalOpen: false,
  };

  getVaccineList = () => {
    Axios.get(`${API_URL}/vaccines`)
      .then((res) => {
        this.setState({ vaccineList: res.data });
        console.log(res);
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
    return (
      <div>
        <div className="doctor-area">
          <div className="container p-0">
            <div className="row justify-content-center mb-5 pb-2">
              <div className="col-md-8 text-center">
                <h2 className="mb-4 font-weight-bold">Vaccine</h2>
                <p>
                  immunisations are the best tool to prevent the transmission of
                  diseases like yellow fever, meningitis or typhoid. it can be
                  live attenuated immunisations (those that use a weakened form
                  of the germ that causes the disease) and inactivated
                  immunisations (which use a dead version of the germ). Both are
                  designed to stimulate the immune system without causing
                  disease.
                </p>
              </div>
            </div>
            <div className="row justify-content-center">
              {this.renderVaccine()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Vaccine;
