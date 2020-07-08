import React from "react";
import "./AdminMembers.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import Button from "../../components/Buttons/Button";
import swal from "sweetalert";

class AdminPayment extends React.Component {
  state = {
    transactionCompleted: [],
    transactionPending: [],
    transactionList: [],
    modalOpen: false,
    dateCalendar: new Date(),
    activeProducts: [],
    activePage: "completed",
    rejectionReasons: "",
    paymentId: 0,
  };

  inputHandler = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  getTransactionCompleted = () => {
    Axios.get(`${API_URL}/transactions/status`, {
      params: {
        status: "completed",
      },
    })
      .then((res) => {
        this.setState({ transactionCompleted: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getTransactionPending = () => {
    Axios.get(`${API_URL}/transactions/status`, {
      params: {
        status: "pending",
      },
    })
      .then((res) => {
        this.setState({ transactionPending: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderTransactionList = () => {
    const { activePage } = this.state;
    if (activePage == "completed") {
      // console.log(this.state.transactionCompleted);
      return this.state.transactionCompleted.map((val, idx) => {
        const {
          id,
          users,
          grandTotalPrice,
          status,
          transactionDate,
          completionDate,
        } = val;
        console.log(val);
        return (
          <>
            <tr
              className="text-center"
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
              <td> {idx + 1} </td>
              <td> {users.username} </td>
              <td>
                {" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(grandTotalPrice)}{" "}
              </td>
              <td>{status}</td>
            </tr>
            <tr
              className={`collapse-item ${
                this.state.activeProducts.includes(idx) ? "active" : null
              }`}
            >
              <td colSpan={1}></td>
              <td className="text-left" colSpan={2}>
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
                    {completionDate}
                  </span>
                </h6>
                <h6>
                  Total Price:
                  <span
                    style={{ fontWeight: "normal" }}
                    className="text-justify"
                  >
                    {grandTotalPrice}
                  </span>
                </h6>
              </td>
            </tr>
          </>
        );
      });
    } else {
      // console.log(this.state.transactionPending);
      return this.state.transactionPending.map((val, idx) => {
        const {
          id,
          userId,
          grandTotalPrice,
          status,
          transactionDate,
          completionDate,
        } = val;

        return (
          <>
            <tr
              className="text-center"
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
              <td> {idx + 1} </td>
              <td> {userId} </td>
              <td>
                {" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(grandTotalPrice)}{" "}
              </td>
              <td>{status}</td>
              <td align="right">
                {" "}
                <Button
                  onClick={() => this.confirmPayment(id)}
                  className="w-80 "
                  type="contained"
                >
                  Accept
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => this.rejectPayment(id)}
                  className="w-80 custom-btn-danger"
                  type="contained"
                >
                  Reject
                </Button>
              </td>
            </tr>
            <tr
              className={`collapse-item ${
                this.state.activeProducts.includes(idx) ? "active" : null
              }`}
            >
              <td colSpan={1}></td>
              <td className="text-left" colSpan={2}>
                <h6 className="mt-2">
                  Transaction Date:
                  <span style={{ fontWeight: "normal" }}>
                    {" "}
                    {transactionDate}
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
                <h6>
                  Completion Date:
                  <span
                    style={{ fontWeight: "normal" }}
                    className="text-justify"
                  >
                    {completionDate}
                  </span>
                </h6>
                <h6>
                  Total Price:
                  <span
                    style={{ fontWeight: "normal" }}
                    className="text-justify"
                  >
                    {grandTotalPrice}
                  </span>
                </h6>
              </td>
            </tr>
          </>
        );
      });
    }
  };

  confirmPayment = (id) => {
    Axios.patch(`${API_URL}/transactions/${id}`, {
      status: "completed",
      completionDate: this.state.dateCalendar.toLocaleDateString(),
    })

      .then((res) => {
        swal("Success!", "The Transaction has been confirmed", "success");
        this.getTransactionPending();
        this.getTransactionCompleted();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(` tgl ${this.state.dateCalendar.toLocaleDateString()}`);
  };

  rejectPayment = (id) => {
    this.setState({
      modalOpen: true,
      paymentId: id,
    });
  };

  addRejectionReason = () => {
    console.log(this.state.rejectionReason);
    Axios.patch(`${API_URL}/transactions/${this.state.paymentId}`, {
      rejectionReason: this.state.rejectionReason,
    })
      .then((res) => {
        swal("Success!", "Rejection reason has been recorded", "success");
        this.setState({ modalOpen: false });
        this.getTransactionCompleted();
        this.getTransactionPending();
      })
      .catch((err) => {
        swal("Error!", "Rejection reason has not been recorded", "error");
        console.log(err);
      });
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  componentDidMount() {
    this.getTransactionCompleted();
    this.getTransactionPending();
  }

  render() {
    return (
      <div className="container admin-container">
        <div className="dashboard">
          <caption className="p-3">
            <h2>Payment</h2>
          </caption>
          <div className="d-flex flex-row">
            <Button
              className={` ${
                this.state.activePage == "completed" ? "active" : null
              }`}
              type="contained"
              onClick={() => this.setState({ activePage: "completed" })}
            >
              Completed
            </Button>
            <Button
              className={`ml-3 ${
                this.state.activePage == "pending" ? "active" : null
              }`}
              type="outlined"
              onClick={() => this.setState({ activePage: "pending" })}
            >
              Pending
            </Button>
          </div>
          <table className="admin-table text-center mt-5">
            <thead>
              <tr className="text-center">
                <th>No.</th>
                <th>User ID</th>
                <th>Total Price</th>
                <th>Status</th>
                {this.state.activePage == "pending" ? (
                  <th colSpan={2}>Action</th>
                ) : null}
              </tr>
            </thead>
            <tbody>{this.renderTransactionList()}</tbody>
          </table>
        </div>
        <Modal
          toggle={this.toggleModal}
          isOpen={this.state.modalOpen}
          className="edit-modal"
        >
          <ModalHeader toggle={this.toggleModal}>
            <caption>
              <h3>Rejection Reason</h3>
            </caption>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12 mt-3">
                <textarea
                  onChange={(e) => this.inputHandler(e, "rejectionReasons")}
                  style={{ resize: "none" }}
                  placeholder="Description"
                  className="custom-text-input"
                ></textarea>
              </div>
              <div className="col-5 mt-5 offset-1">
                <Button
                  className="w-100"
                  onClick={this.toggleModal}
                  type="outlined"
                >
                  Cancel
                </Button>
              </div>
              <div className="col-5 mt-5">
                <Button
                  className="w-100"
                  onClick={this.addRejectionReason}
                  type="contained"
                >
                  Save
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AdminPayment;
