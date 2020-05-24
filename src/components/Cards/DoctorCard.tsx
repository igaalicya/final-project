import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
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
      <div className="col-md-6 col-lg-3">
        <div className="doctor">
          <div className="d-flex">
            <img
              className="img align-self-stretch"
              src={this.props.data.image}
              alt={this.props.data.fullName}
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <div className="text pt-3 text-center">
            <h3 className="mb-2">{this.props.data.fullName}</h3>
            <span className="text-primary mb-2">
              {this.props.data.specialist}
            </span>
            <div>
              <p>{this.props.data.desc}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DoctorCard;
