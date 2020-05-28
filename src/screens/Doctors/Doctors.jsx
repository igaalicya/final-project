import React from "react";
import "./Doctors.css";
import { Link } from "react-router-dom";
import DoctorCard from "../../components/Cards/DoctorCard.tsx";

const dummy = [
  {
    fullName: "Doctor 1",
    image:
      "https://d1ojs48v3n42tp.cloudfront.net/personnels/242073_18-2-2020_16-38-29.jpg",
    specialist: "hdkasdhkjhfksahf",
    address: "BSD",
    desc:
      "I am an ambitious workaholic, but apart from that, pretty simple person.",
    id: 1,
  },
  {
    fullName: "Doctor 2",
    image:
      "https://d1ojs48v3n42tp.cloudfront.net/personnels/242073_18-2-2020_16-38-29.jpg",
    specialist: "hdkasdhkjhfksahf",
    address: "BSD",
    desc:
      "I am an ambitious workaholic, but apart from that, pretty simple person.",
    id: 2,
  },
  {
    fullName: "Doctorr 3",
    image:
      "https://d1ojs48v3n42tp.cloudfront.net/personnels/242073_18-2-2020_16-38-29.jpg",
    specialist: "hdkasdhkjhfksahf",
    address: "BSD",
    desc:
      "I am an ambitious workaholic, but apart from that, pretty simple person.",
    id: 3,
  },
];

class Doctors extends React.Component {
  renderDoctor = () => {
    return dummy.map((val) => {
      return (
        // <Link
        //   to={`/doctors/${val.id}`}
        //   style={{ textDecoration: "none", color: "inherit" }}
        // >
        <DoctorCard data={val} className="m-2" />
        // </Link>
      );
    });
  };

  render() {
    return (
      <div>
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
              {this.renderDoctor()}
              <div className="col-md-6 col-lg-3">
                <div className="doctor">
                  <div className="d-flex">
                    <img
                      className="img align-self-stretch"
                      src="https://d1ojs48v3n42tp.cloudfront.net/personnels/242073_18-2-2020_16-38-29.jpg"
                      alt="doctor's"
                      style={{
                        objectFit: "contain",
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

export default Doctors;
