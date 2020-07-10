import React from "react";
import "./Home.css";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedkit, faBolt, faHome } from "@fortawesome/free-solid-svg-icons";

import DoctorCard from "../../components/Cards/DoctorCard.tsx";
import Button from "../../components/Buttons/Button";
import bg1 from "../../assets/images/banner/bg1.png";
import ArticleCard from "../../components/Cards/ArticleCard";
import VaccineCard from "../../components/Cards/VaccineCard.tsx";

const dummyArticles = [
  {
    title: "How Important BCG Vaccine",
    image:
      "https://images.newscientist.com/wp-content/uploads/2020/05/06154024/g2550116-bcg_vaccine_in_human_blood_cell_web.jpg",
    text:
      "There is no evidence that the Bacille Calmette-Guérin vaccine (BCG) protects people against infection with COVID-19 virus. Two clinical trials addressing this question are underway, and WHO will evaluate the evidence when it is available.",
    postDate: "03 Jan 20",
    id: 1,
  },
  {
    title: "Vaccination greatly reduces disease",
    image:
      "https://www.pharmaceutical-technology.com/wp-content/uploads/sites/10/2019/09/virus.jpg",
    text:
      "Vaccination has greatly reduced the burden of infectious diseases. Only clean water, also considered to be a basic human right, performs better",
    postDate: "08 Jan 20",
    id: 2,
  },
];

class Home extends React.Component {
  state = {
    doctorList: [],
    vaccineList: [],
    modalOpen: false,
  };

  getVaccineList = () => {
    Axios.get(`${API_URL}/vaccines/home`)
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
          <VaccineCard data={val} className="m-2" />
        </Link>
      );
    });
  };

  // kalo sudah pake springtools limit data jadi 3
  getDoctorList = () => {
    Axios.get(`${API_URL}/doctors/home`)
      .then((res) => {
        this.setState({ doctorList: res.data });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderDoctor = () => {
    return this.state.doctorList.map((val) => {
      // console.log(val);
      return (
        <Link
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
    this.getVaccineList();
  }

  renderArticle = () => {
    return dummyArticles.map((val) => {
      return (
        <div className="col-md-6 col-lg-4">
          <Link
            className="col-md-6 col-lg-4 mb-4 mb-lg-0"
            to={`/article/${val.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ArticleCard data={val} />
          </Link>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <div className="doctor-banner container">
          <div className="row align-items-center text-center text-md-left">
            <div className="col-md-6 col-lg-5 mb-5 mb-md-0">
              <h1>We are here for your Care</h1>
              <p className="text-secondary mb-4" style={{ fontSize: "17px" }}>
                Vromo provides a comprehensive services performed by a specially
                trained medical team on vaccinations that help you prevent the
                most common diseases. We are continually updates our facilities
                and staff qualification. In improving the quality of vaccination
                services, Vrome applies values that prioritize patient’s safety,
                quality info to patients and proper medical records.
              </p>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/vaccine"
              >
                <Button
                  className="hero-banner-button"
                  type="contained"
                  value="GetVaccine"
                >
                  Get Vaccine
                </Button>
              </Link>
            </div>
            <div className="col-md-6 col-lg-7 col-xl-6 offset-xl-1">
              <img
                className="img align-self-stretch"
                src={bg1}
                alt="background banner"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>

        <div className="container section-margin generic-margin">
          <div className="section-intro text-center pb-90px">
            <h2>Our Service</h2>
            <p>We provide the best service to help you get vaccination</p>
          </div>
          <div className="row generic-margin">
            <div className=" col-lg-4 col-md-6 col-sm-6">
              <div className="single-services text-center mb-30">
                <div className="services-icon">
                  <FontAwesomeIcon icon={faMedkit} />
                </div>
                <div className="services-cap">
                  <h5 className="service-text">Vaccination Info</h5>
                  <p>
                    We provides you information on vaccines that help you
                    prevent the most common diseases.
                  </p>
                </div>
              </div>
            </div>
            <div className=" col-lg-4 col-md-6 col-sm-6">
              <div className="single-services text-center mb-30">
                <div className="services-icon">
                  <FontAwesomeIcon icon={faHome} />
                </div>
                <div className="services-cap">
                  <h5 className="service-text">Home Service</h5>
                  <p>
                    Don't worry, we provide home service for you who are not
                    able get service in our clinic.
                  </p>
                </div>
              </div>
            </div>
            <div className=" col-lg-4 col-md-6 col-sm-6">
              <div className="single-services text-center mb-30">
                <div className="services-icon">
                  <FontAwesomeIcon icon={faBolt} />
                </div>
                <div className="services-cap">
                  <h5 className="service-text">Fast Booking</h5>
                  <p>
                    You're in a hurry? Book online now and get your vaccinations
                    as soon as possible
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* VACCINE */}
        <div className="container section-margin generic-margin">
          <div className="section-intro text-center pb-90px">
            {/* <img
              className="section-intro-img"
              src="https://cdn1.iconfinder.com/data/icons/medical-2-19/512/medical-healthcare-hospital-26-64.png"
              alt=""
            /> */}
            <h2>Find Your Vaccine</h2>
            <p>
              immunisations are the best tool to prevent the transmission of
              diseases. it can be live attenuated immunisations and inactivated
              immunisations.
            </p>
          </div>
          <div className="row generic-margin justify-content-center">
            {this.renderVaccine()}
          </div>
        </div>
        {/* DOCTOR */}
        <div className="container section-margin generic-margin">
          <div className="section-intro text-center pb-90px">
            {/* <img
              className="section-intro-img"
              src="https://cdn1.iconfinder.com/data/icons/medical-2-19/512/medical-healthcare-hospital-26-64.png"
              alt=""
            /> */}
            <h2>Our Qualified Doctors</h2>
            <p>
              Our team is carefully selected
              <br />
              for their expert professional qualifications and dedication to
              patient care
            </p>
          </div>
          <div className="row generic-margin">{this.renderDoctor()}</div>
        </div>
        {/* ARTICLE */}
        {/* <div className="container section-margin generic-margin">
          <div className="section-intro text-center pb-90px">
            <h2>From our Blog</h2>
            <p>
              Fowl have fruit moveth male they are that place you will lesser
            </p>
          </div>

          <div className="row  generic-margin">
            {this.renderArticle()}
          </div>
        </div> */}
      </div>
    );
  }
}

export default Home;
