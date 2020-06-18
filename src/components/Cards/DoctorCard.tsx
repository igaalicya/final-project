import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import "./DoctorCard.css";
// import { Button } from "reactstrap";

interface DoctorCardData {
  id?: number;
  fullName?: string;
  address?: number;
  image?: string;
  specialist?: string;
  desc?: string;
}

type DoctorCardProps = {
  data: DoctorCardData;
};

class DoctorCard extends React.Component<DoctorCardProps> {
  render() {
    // const { id, fullName, address, image } = this.props.data;

    return (
      <div>
        <div className="doctor-card text-center mb-4">
          <div className="doctor-card-img">
            <img
              className="img align-self-stretch"
              src={this.props.data.image}
              alt={this.props.data.fullName}
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <div className="doctor-card-body text-center">
            <h3>{this.props.data.fullName}</h3>
            <span className="text-primary mb-2">
              {this.props.data.specialist}
            </span>
            <p>{this.props.data.desc}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default DoctorCard;
