import React from "react";
import { connect } from "react-redux";
import "./History.css";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import Button from "../../components/Buttons/Button";
import { Table, Alert } from "reactstrap";

// import TextField from "../../components/TextField/TextField";

class History extends React.Component {
  state = {
    historyData: [],
    modalOpen: false,
    activeProducts: [],
  };

  componentDidMount() {
    this.getHistoryData();
  }

  getHistoryData = () => {
    Axios.get(`${API_URL}/transactions`, {
      params: {
        userId: this.props.user.id,
        status: "completed",
        _embed: "transactionDetail",
        _expand: "doctor",
      },
    })
      .then((res) => {
        console.log(res.data);

        this.setState({
          historyData: res.data,
        });

        console.log(this.state.historyData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  detailTransactions = (idx) => {
    this.setState({
      modalOpen: true,
    });
  };

  renderHistory = () => {
    return this.state.historyData.map((val, idx) => {
      const { grandTotalPrice, transactionDate, CompletionDate, doctor } = val;
      return (
        <>
          <tr className="text-center">
            <td> {idx + 1} </td>
            {/* <td> {userId} </td> */}
            <td> {transactionDate} </td>
            <td> {doctor.fullName} </td>
            <td>
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(grandTotalPrice)}{" "}
            </td>
            <td>
              <Button
                onClick={() => {
                  if (this.state.activeProducts.includes(idx)) {
                    this.setState({
                      activeProducts: [
                        ...this.state.activeProducts.filter(
                          (item) => item !== idx
                        ),
                      ],
                    });
                  } else {
                    this.setState({
                      activeProducts: [...this.state.activeProducts, idx],
                    });
                  }
                }}
              >
                Detail
              </Button>
            </td>
          </tr>
          <tr
            className={`collapse-item ${
              this.state.activeProducts.includes(idx) ? "active" : null
            }`}
          >
            <td className="" colSpan={3}>
              <div className="d-flex justify-content-around align-items-center">
                <div className="d-flex">
                  <div className="d-flex flex-column ml-4 justify-content-center">
                    {/* <h5>{transactionDate}</h5> */}
                    <h6 className="mt-2">
                      Transaction Date:
                      <span style={{ fontWeight: "normal" }}>
                        {" "}
                        {transactionDate}
                      </span>
                    </h6>
                    <h6>
                      Completion Date:
                      <span
                        style={{ fontWeight: "normal" }}
                        className="text-justify"
                      >
                        {CompletionDate}
                      </span>
                    </h6>
                    <h6>
                      Price:
                      <span
                        style={{ fontWeight: "normal" }}
                        className="text-justify"
                      >
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(grandTotalPrice)}
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </>
      );
    });
  };
  render() {
    return (
      <div className="container history-container">
        <caption className="p-3">
          <h2>History</h2>
        </caption>
        {this.state.historyData.length > 0 ? (
          <Table>
            <thead className="text-center">
              <tr className="text-center">
                <th>No.</th>
                {/* <th>User ID</th> */}
                <th>Transaction Date</th>
                <th>Doctor's Name</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{this.renderHistory()}</tbody>
            <tfoot></tfoot>
          </Table>
        ) : (
          <Alert>Your History is empty!</Alert>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(History);
