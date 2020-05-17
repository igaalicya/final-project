import React from "react";
import Background from "../../assets/images/carousel/background.jpg";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserMd,
  faHome,
  faSyringe
} from "@fortawesome/free-solid-svg-icons/";
// import DoctorCard from "../../components/Cards/DoctorCard.tsx";

// const dummy = [
//   {
//     fullName: "Doctor 1",
//     image: "https://d1ojs48v3n42tp.cloudfront.net/personnels/242073_18-2-2020_16-38-29.jpg",
//     address: "hdkasdhkjhfksahf",
//     id: 1
//   },
//   {
//     fullName: "Doctor 2",
//     image: "https://d1ojs48v3n42tp.cloudfront.net/personnels/242073_18-2-2020_16-38-29.jpg",
//     address: "hdkasdhkjhfksahf",
//     id: 2
//   },
//   {
//     fullName: "Doctor 3",
//     image: "https://d1ojs48v3n42tp.cloudfront.net/personnels/242073_18-2-2020_16-38-29.jpg",
//     address: "hdkasdhkjhfksahf",
//     id: 3
//   }
// ];

class Home extends React.Component {
  // renderDoctor = () => {
  //   return dummy.map(val => {
  //     return (
  //       <Link
  //         to={`/product/${val.id}`}
  //         style={{ textDecoration: "none", color: "inherit" }}
  //       >
  //       <DoctorCard
  //         key={`bestseller-${val.id}`}
  //         data={val}
  //         className="m-2"
  //         user={this.props.user}
  //       />
  //       </Link>
  //     );
  //   });
  // };

  render() {
    return (
      <div>
        <div
          className="container-home"
          style={{
            objectFit: "contain",
            backgroundImage: `url(${Background})`
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
            <div className="row">
              {/* {this.renderDoctor()} */}
              <div className="col-md-6 col-lg-3">
                <div className="doctor">
                  <div className="d-flex">
                    <img
                      className="img align-self-stretch"
                      src="https://d1ojs48v3n42tp.cloudfront.net/personnels/242073_18-2-2020_16-38-29.jpg"
                      alt="doctor's"
                      style={{
                        objectFit: "contain"
                      }}
                    />
                  </div>
                  <div className="text pt-3 text-center">
                    <h3 className="mb-2">dr. Arifin Kurniawan Kashmir, Sp.A</h3>
                    <span className="text-primary mb-2">Pediatrician</span>
                    <div>
                      <p>
                        I am an ambitious workaholic, but apart from that,
                        pretty simple person.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="doctor">
                  <div className="d-flex align-items-stretch">
                    <img
                      className="img align-self-stretch"
                      src="https://d1ojs48v3n42tp.cloudfront.net/personnels/242073_18-2-2020_16-38-29.jpg"
                      alt="doctor's"
                      style={{
                        objectFit: "contain"
                      }}
                    />
                  </div>
                  <div className="text pt-3 text-center">
                    <h3 className="mb-2">dr. Arifin Kurniawan Kashmir, Sp.A</h3>
                    <span className="text-primary mb-2">Pediatrician</span>
                    <div>
                      <p>
                        I am an ambitious workaholic, but apart from that,
                        pretty simple person.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
