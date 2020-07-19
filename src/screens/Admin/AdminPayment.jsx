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
    transactionRejected: [],
    transactionList: [],
    detailTransactions: {},
    modalOpen: false,
    viewImage: false,
    dateCalendar: new Date(),
    activeProducts: [],
    activePage: "pending",
    rejectForm: {
      rejectionReasons: "",
    },
    paymentId: 0,
  };

  inputHandler = (e, field, form) => {
    let { value } = e.target;
    this.setState({
      [form]: {
        ...this.state[form],
        [field]: value,
      },
    });
    console.log(e.target);
  };

  detailBtnHadler = (idx) => {
    const { activePage } = this.state;
    if (activePage === "pending") {
      this.setState({
        detailTransactions: {
          ...this.state.transactionPending[idx],
        },
        viewImage: true,
      });
      console.log(this.state.transactionPending[idx]);
    } else if (activePage === "completed") {
      this.setState({
        detailTransactions: {
          ...this.state.transactionCompleted[idx],
        },
        viewImage: true,
      });
      console.log(this.state.transactionCompleted[idx]);
    } else if (activePage === "rejected") {
      this.setState({
        detailTransactions: {
          ...this.state.transactionRejected[idx],
        },
        viewImage: true,
      });
      console.log(this.state.transactionRejected[idx]);
    }
  };

  viewImageHandler = (idx) => {
    this.setState({
      viewImage: true,
    });
  };

  getTransactionCompleted = () => {
    Axios.get(`${API_URL}/transactions/status`, {
      params: {
        status: "completed",
      },
    })
      .then((res) => {
        this.setState({ transactionCompleted: res.data });
        // console.log(res.data);
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

  getTransactionRejected = () => {
    Axios.get(`${API_URL}/transactions/status`, {
      params: {
        status: "rejected",
      },
    })
      .then((res) => {
        this.setState({ transactionRejected: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderTransactionList = () => {
    const { activePage } = this.state;
    if (activePage === "completed") {
      // console.log(this.state.transactionCompleted);
      return this.state.transactionCompleted.map((val, idx) => {
        const {
          users,
          grandTotalPrice,
          status,
          transactionDate,
          completionDate,
        } = val;
        console.log(val);
        return (
          <>
            <tr>
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
              <td align="center">
                <Button
                  onClick={() => this.detailBtnHadler(idx)}
                  className="w-80 "
                  type="contained"
                >
                  Detail
                </Button>
              </td>
            </tr>
          </>
        );
      });
    } else if (activePage === "rejected") {
      return this.state.transactionRejected.map((val, idx) => {
        const {
          users,
          grandTotalPrice,
          status,
          transactionDate,
          completionDate,
          rejectionReason,
        } = val;
        console.log(val);
        return (
          <>
            <tr>
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
              <td align="center">
                <Button
                  onClick={() => this.detailBtnHadler(idx)}
                  className="w-80 "
                  type="contained"
                >
                  Detail
                </Button>
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
          users,
          grandTotalPrice,
          status,
          transactionDate,
          completionDate,
          buktiTransfer,
        } = val;

        return (
          <>
            <tr>
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
              {buktiTransfer ? (
                <td>
                  <img
                    onClick={this.viewImageHandler}
                    style={{ width: "100px" }}
                    src={buktiTransfer}
                    alt=""
                  />
                </td>
              ) : (
                <td className="text-secondary">
                  Payment slip has not been uploaded
                </td>
              )}
              {/* {console.log(buktiTransfer)} */}

              <td align="center">
                <Button
                  onClick={() => this.detailBtnHadler(idx)}
                  className="w-80 "
                  type="contained"
                >
                  Detail
                </Button>
              </td>
            </tr>
          </>
        );
      });
    }
  };

  confirmPayment = (id) => {
    Axios.put(`${API_URL}/transactions/accept/${id}`, {
      status: "completed",
      completionDate: this.state.dateCalendar.toLocaleDateString(),
    })

      .then((res) => {
        swal("Success!", "The Transaction has been confirmed", "success");
        this.setState({ viewImage: false });
        this.getTransactionPending();
        this.getTransactionCompleted();
      })
      .catch((err) => {
        console.log(err);
        this.setState({ viewImage: false });
      });
    console.log(` tgl ${this.state.dateCalendar.toLocaleDateString()}`);
  };

  rejectPayment = (id) => {
    this.setState({
      viewImage: false,
      modalOpen: true,
      paymentId: id,
    });
  };

  addRejectionReason = () => {
    console.log(this.state.rejectForm.rejectionReasons);
    Axios.put(`${API_URL}/transactions/reject/${this.state.paymentId}`, {
      rejectionReason: this.state.rejectForm.rejectionReasons,
      status: "rejected",
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

  renderBtnAction = () => {
    if (this.state.activePage === "pending") {
      return (
        <div className="row justify-content-center m-2">
          <Button
            onClick={() =>
              this.confirmPayment(this.state.detailTransactions.id)
            }
            className="w-80 "
            type="contained"
          >
            Accept
          </Button>
          {"   "}
          <Button
            onClick={() => this.rejectPayment(this.state.detailTransactions.id)}
            className="w-80 custom-btn-danger"
            type="contained"
          >
            Reject
          </Button>
        </div>
      );
    }
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  toggleModalBukti = () => {
    this.setState({ viewImage: !this.state.viewImage });
  };

  componentDidMount() {
    this.getTransactionCompleted();
    this.getTransactionPending();
    this.getTransactionRejected();
  }

  render() {
    return (
      <div className="container admin-container">
        <div className="dashboard">
          <caption className="p-3">
            <h2>Payment {this.state.activePage}</h2>
          </caption>
          <div className="d-flex flex-row">
            <Button
              className="ml-3"
              type={`${
                this.state.activePage === "pending" ? "contained" : "outlined"
              }`}
              onClick={() => this.setState({ activePage: "pending" })}
            >
              Pending
            </Button>
            <Button
              className="ml-3"
              type={`${
                this.state.activePage === "completed" ? "contained" : "outlined"
              }`}
              onClick={() => this.setState({ activePage: "completed" })}
            >
              Completed
            </Button>
            <Button
              className="ml-3"
              type={`${
                this.state.activePage === "rejected" ? "contained" : "outlined"
              }`}
              onClick={() => this.setState({ activePage: "rejected" })}
            >
              Rejected
            </Button>
          </div>
          {/* <h3>{this.state.activePage}</h3> */}
          <table className="admin-table text-center mt-5">
            <thead>
              <tr className="text-center">
                <th>No.</th>
                <th>User ID</th>
                <th>Total Price</th>
                <th>Status</th>
                {this.state.activePage === "pending" ? (
                  <>
                    <th>Payment Slip</th>
                  </>
                ) : null}
                <th colSpan={2}>Action</th>
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
                  value={this.state.rejectForm.rejectionReasons}
                  onChange={(e) =>
                    this.inputHandler(e, "rejectionReasons", "rejectForm")
                  }
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
        <Modal
          toggle={this.toggleModalBukti}
          isOpen={this.state.viewImage}
          className="edit-modal"
          // size="lg"
        >
          <ModalHeader toggle={this.toggleModalBukti}>
            <caption>
              <h3>Detail Transaction</h3>
            </caption>
          </ModalHeader>
          <ModalBody className="justify-content-center">
            <div className="justify-content-center">
              {this.state.detailTransactions.buktiTransfer ? (
                <>
                  <h6>Payment slip: </h6>
                  <img
                    className="center"
                    style={{ width: "460px" }}
                    src="https://media.karousell.com/media/photos/products/2017/11/27/bukti_transfer_1511770644_d1d5a6a2.jpg"
                    alt=""
                  />
                </>
              ) : null}
              <h6 className="mt-2">
                Transaction Date:
                <span style={{ fontWeight: "normal" }}>
                  {" "}
                  {this.state.detailTransactions.transactionDate}
                </span>
              </h6>
              <h6>
                Completion Date:
                <span style={{ fontWeight: "normal" }} className="text-justify">
                  {this.state.detailTransactions.completionDate}
                </span>
              </h6>
              <h6>
                Total Price:
                <span style={{ fontWeight: "normal" }} className="text-justify">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(this.state.detailTransactions.grandTotalPrice)}
                </span>
              </h6>
              {this.state.detailTransactions.rejectionReason ? (
                <h6>
                  Rejection Reason:
                  <span
                    style={{ fontWeight: "normal" }}
                    className="text-justify"
                  >
                    {this.state.detailTransactions.rejectionReason}
                  </span>
                </h6>
              ) : null}
              {this.state.detailTransactions.buktiTransfer ? (
                this.renderBtnAction()
              ) : (
                <h6>Payment slip has not been uploaded</h6>
              )}
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AdminPayment;
