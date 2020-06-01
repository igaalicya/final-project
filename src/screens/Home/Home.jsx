import React from "react";
import Background from "../../assets/images/carousel/background.jpg";
import "./Home.css";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserMd,
  faHome,
  faSyringe,
} from "@fortawesome/free-solid-svg-icons/";
import { Link } from "react-router-dom";
import DoctorCard from "../../components/Cards/DoctorCard.tsx";
import {
  Card,
  CardTitle,
  CardBody,
  CardImg,
  CardText,
  CardDeck,
} from "reactstrap";

const dummyArticles = [
  {
    title: "How Important BCG Vaccine",
    image:
      "https://images.newscientist.com/wp-content/uploads/2020/05/06154024/g2550116-bcg_vaccine_in_human_blood_cell_web.jpg",
    text:
      "There is no evidence that the Bacille Calmette-Guérin vaccine (BCG) protects people against infection with COVID-19 virus. Two clinical trials addressing this question are underway, and WHO will evaluate the evidence when it is available.",
    id: 1,
  },
  {
    title: "Vaccination greatly reduces disease",
    image:
      "https://www.pharmaceutical-technology.com/wp-content/uploads/sites/10/2019/09/virus.jpg",
    text:
      "Vaccination has greatly reduced the burden of infectious diseases. Only clean water, also considered to be a basic human right, performs better",
    id: 2,
  },
];

class Home extends React.Component {
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
    return this.state.doctorList.map((val) => {
      console.log(val);
      return (
        <Link
          className="col-md-6 col-lg-3"
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
          <CardDeck>
            <Card>
              <CardBody>
                <CardTitle className="font-weight-bold">{val.title}</CardTitle>
              </CardBody>
              <CardImg
                className="card-img"
                src={val.image}
                alt="Card image cap"
              />
              <CardBody>
                <CardText>{val.text}</CardText>
                <Link href="#">Card Link</Link>
              </CardBody>
            </Card>
          </CardDeck>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <div
          className="container-home"
          style={{
            objectFit: "contain",
            backgroundImage: `url(${Background})`,
          }}
        >
          <div className="container">
            <div className="row align-items-center justify-content-end">
              <div className="col-md-6 pt-5 ">
                {/* <div className="mt-5"> */}
                <span className="text-primary">Welcome to Vrome</span>
                <h1 className="font-weight-bold">
                  We are here <br />
                  for your Care
                </h1>
                <p className="mb-4">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Corporis provident laborum, natus similique, ex voluptatibus
                  aperiam at exercitationem molestias commodi molestiae cum eum.
                  Iure, dolore veritatis explicabo repellat ex aperiam!.
                </p>
                <p>
                  <a href="/" className="btn btn-primary py-3 px-4">
                    Get a vaccine
                  </a>
                </p>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="service-area">
          <div className="container p-0">
            <div className="row">
              <div className="col-xl-4 col-md-4">
                <div className="service">
                  <FontAwesomeIcon icon={faUserMd} style={{ fontSize: 50 }} />
                  <h3>Good Doctor</h3>
                  <p className="font-weight-normal text-white">
                    Clinical excellence must be the priority for any health care
                    service provider.
                  </p>
                  <a href="/" className="boxed-btn">
                    See Profile
                  </a>
                </div>
              </div>
              <div className="col-xl-4 col-md-4">
                <div className="service">
                  <FontAwesomeIcon icon={faSyringe} style={{ fontSize: 50 }} />
                  <h3>Good Vaccine</h3>
                  <p>we provide every vaccine you need for your children.</p>
                  <a href="/" className="boxed-btn">
                    Get Vaccine
                  </a>
                </div>
              </div>
              <div className="col-xl-4 col-md-4">
                <div className="service">
                  <FontAwesomeIcon icon={faHome} style={{ fontSize: 50 }} />
                  <h3>Home Service</h3>
                  <p>
                    we provide home service for you who are not able get service
                    in our clinic.
                  </p>
                  <a href="/" className="boxed-btn">
                    Make an Appointmentt
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="doctor-area">
          <div className="container p-0">
            <div className="row justify-content-center mb-5 pb-2">
              <div className="col-md-8 text-center">
                <h2 className="mb-4 font-weight-bold">Our Qualified Doctors</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                  id voluptates optio inventore accusamus eveniet eaque
                  perspiciatis voluptatem eum! Harum architecto dignissimos
                  dicta, quos illum autem nobis eum impedit dolorem!
                </p>
              </div>
            </div>
            <div className="row">{this.renderDoctor()}</div>
          </div>
        </div>
        <div className="doctor-area">
          <div className="container p-0">
            <div className="row justify-content-center mb-5 pb-2">
              <div className="col-md-8 text-center">
                <h2 className="mb-4 font-weight-bold">Articles</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                  id voluptates optio inventore accusamus eveniet eaque
                  perspiciatis voluptatem eum! Harum architecto dignissimos
                  dicta, quos illum autem nobis eum impedit dolorem!
                </p>
              </div>
            </div>
            <div className="row">{this.renderArticle()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
