import React from "react";
import "./Doctors.css";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { Link } from "react-router-dom";
import DoctorCard from "../../components/Cards/DoctorCard.tsx";

class Doctors extends React.Component {
  state = {
    doctorList: [],
    modalOpen: false,
  };

  getDoctorList = () => {
    Axios.get(`${API_URL}/doctors`)
      .then((res) => {
        this.setState({ doctorList: res.data });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderDoctor = () => {
    return this.state.doctorList.map((val, idx) => {
      console.log(val);
      return (
        <Link
          key={idx.toString()}
          className="col-md-6 col-lg-4 mb-4 mb-lg-0"
          to={`/profileDoctor/${val.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <DoctorCard data={val} className="m-2" />
        </Link>
      );
    });
  };

  componentDidMount() {
    this.getDoctorList();
  }

  render() {
    return (
      <div>
        <div className="doctor-area">
          <div className="container p-0">
            <div className="row justify-content-center mb-5 pb-2">
              <div className="col-md-8 text-center">
                <h2 className="mb-4 font-weight-bold">Our Qualified Doctors</h2>
                <p>
                  Our team is carefully selected for their expert professional
                  qualifications and dedication to patient care.
                </p>
              </div>
            </div>
            <div className="row">{this.renderDoctor()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Doctors;
