import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import "./VaccineCard.css";
// import { Button } from "reactstrap";

interface VaccineCardData {
  id?: number;
  vaccineName?: string;
  price?: number;
  ageOfDose?: number;
  brand?: string;
  desc?: string;
}

type VaccineCardProps = {
  data: VaccineCardData;
};

class VaccineCard extends React.Component<VaccineCardProps> {
  render() {
    // const { id, fullName, address, image } = this.props.data;

    return (
      <div className="col-md-4 col-lg-3">
        <div className="vaccine-card p-2">
          <div className="d-flex">
            <FontAwesomeIcon
              icon={faHeart}
              style={{ fontSize: 50, color: "red" }}
            />
            <div className="text pt-3">
              <h3 className="mb-2">{this.props.data.vaccineName}</h3>
              <span className="text-primary mb-2">{this.props.data.price}</span>
              <div>
                <p style={{ fontSize: 12 }}>{this.props.data.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VaccineCard;
