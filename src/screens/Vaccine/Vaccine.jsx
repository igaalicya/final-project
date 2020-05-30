import React from "react";
import "./Vaccine.css";
import Axios from "axios";
import { API_URL } from "../../constants/API";
// import { Link } from "react-router-dom";
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
      return <VaccineCard data={val} className="m-2" />;
    });
  };

  componentDidMount() {
    this.getVaccineList();
  }

  render() {
    return (
      <div>
        <div className="vaccine-area">
          <div className="container p-0">
            <div className="row justify-content-center mb-5 pb-2">
              <div className="col-md-8 text-center">
                <h2 className="mb-4 font-weight-bold">Vaccine</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                  id voluptates optio inventore accusamus eveniet eaque
                  perspiciatis voluptatem eum! Harum architecto dignissimos
                  dicta, quos illum autem nobis eum impedit dolorem!
                </p>
              </div>
            </div>
            <div className="row">{this.renderVaccine()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Vaccine;
