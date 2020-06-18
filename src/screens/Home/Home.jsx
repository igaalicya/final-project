import React from "react";
import Background from "../../assets/images/carousel/background.jpg";
import "./Home.css";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons/";
import { Link } from "react-router-dom";
import DoctorCard from "../../components/Cards/DoctorCard.tsx";
import Button from "../../components/Buttons/Button";
import bg1 from "../../assets/images/banner/bg1.png";
import ArticleCard from "../../components/Cards/ArticleCard";

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
    modalOpen: false,
  };

  // kalo sudah pake springtools limit data jadi 3
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
    return this.state.doctorList.map((val) => {
      console.log(val);
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
              <p className="text-secondary mb-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Perferendis molestias reprehenderit earum? Tempora magni nisi
                accusamus omnis inventore temporibus molestias ipsum, quia enim
                quae soluta at aliquid unde eos doloremque.
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
        {/* DOCTOR */}
        <div className="container section-margin generic-margin">
          <div className="section-intro text-center pb-90px">
            {/* <img
              className="section-intro-img"
              src="https://cdn1.iconfinder.com/data/icons/medical-2-19/512/medical-healthcare-hospital-26-64.png"
              alt=""
            /> */}
            <h2>Our Qualified Doctors</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </div>
          <div className="row generic-margin">{this.renderDoctor()}</div>
        </div>
        {/* ARTICLE */}
        <div className="container section-margin generic-margin">
          <div className="section-intro text-center pb-90px">
            {/* <img
              className="section-intro-img"
              src="img/home/section-icon.png"
              alt=""
            /> */}
            <h2>From our Blog</h2>
            <p>
              Fowl have fruit moveth male they are that place you will lesser
            </p>
          </div>

          <div className="row  generic-margin">
            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
              <div className="article-card">
                <img
                  className="card-img rounded-0"
                  src="https://technext.github.io/safario/img/blog/blog-2.png"
                  alt=""
                />
                <div className="article-card-body">
                  <Link
                    className="text-center"
                    style={{ textDecoration: "none", color: "inherit" }}
                    to="/article"
                  >
                    <h4>Forest responds to smoking in al fresco.</h4>
                  </Link>
                  <FontAwesomeIcon icon={faCalendarAlt} /> Jan 03, 2018
                  <p>
                    Varius metus morbi ferme libero vehic on porta malesuada ut
                    interdu estmales torquent vehicula parturient{" "}
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="row">{this.renderArticle()}</div> */}
            {this.renderArticle()}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
