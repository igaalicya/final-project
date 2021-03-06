import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart } from "@fortawesome/free-regular-svg-icons";
import "./VaccineCard.css";
// import { Button } from "reactstrap";

interface VaccineCardData {
  id?: number;
  vaccineName?: string;
  price: number;
  ageOfDose?: number;
  brand?: string;
  desc?: string;
  image?: string;
  stock?: number;
  sold?: number;
}

type VaccineCardProps = {
  data: VaccineCardData;
};

class VaccineCard extends React.Component<VaccineCardProps> {
  render() {
    const { price } = this.props.data;
    return (
      <div>
        {/* <div className="p-2"> */}
        <div className="d-flex">
          <div className="row">
            <div className="col-lg-4 col-md-3">
              <img
                style={{ objectFit: "contain" }}
                alt="..."
                className="vaccine-image"
                src={this.props.data.image}
              />
            </div>
            <div className="col-lg-8 col-md-6">
              <div className="pt-3">
                <h4 className="mb-2">{this.props.data.vaccineName}</h4>
                <p style={{ fontSize: 12 }}>
                  stock : {this.props.data.stock} pcs
                </p>
                <p style={{ fontSize: 12 }}>
                  sold : {this.props.data.sold} pcs
                </p>
                <span className="text-primary mb-2">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(price)}
                </span>
                <div>
                  <p style={{ fontSize: 12 }}>{this.props.data.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    );
  }
}

export default VaccineCard;
