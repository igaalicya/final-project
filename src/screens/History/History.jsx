import React from "react";
import { connect } from "react-redux";
import "./History.css";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import Button from "../../components/Buttons/Button";
import { Table, Alert, Modal, ModalBody, ModalHeader } from "reactstrap";
import swal from "sweetalert";

// import TextField from "../../components/TextField/TextField";

class History extends React.Component {
  state = {
    historyData: [],
    modalOpen: false,
    activeProducts: [],
    selectedFile: null,
    transactionsId: 0,
    transactionData: {},
    // transactionData: {
    //   grandTotalPrice: 0,
    //   transactionDate: "",
    //   completionDate: "",
    //   doctors: {},
    // },
  };

  componentDidMount() {
    this.getHistoryData();
  }

  fileChangeHandler = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  getHistoryData = () => {
    Axios.get(`${API_URL}/transactions/thisUser`, {
      params: {
        usersId: this.props.user.id,
        // status: "completed",
        // _embed: "transactionDetail",
        // _expand: "doctor",
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

  uploadBuktiTransfer = (id) => {
    let formData = new FormData();

    formData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    formData.append(
      "transactionsData",
      JSON.stringify(this.state.transactionData)
    );

    Axios.put(
      `${API_URL}/transactions/uploadBukti/${this.state.transactionData.id}`,
      formData
    )
      .then((res) => {
        console.log(res.data);
        swal("Success!", "Your data has been uploaded", "success");
        this.setState({ modalOpen: false });
        this.getHistoryData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  uploadBuktiBtnHandler = (idx) => {
    this.setState({
      transactionData: {
        ...this.state.historyData[idx],
      },
      transactionsId: this.state.historyData[idx].id,
      modalOpen: true,
      // transactionsId: id,
    });
    console.log(this.state.historyData[idx].id);
    console.log(this.state.transactionData);
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  renderHistory = () => {
    return this.state.historyData.map((val, idx) => {
      const {
        grandTotalPrice,
        transactionDate,
        completionDate,
        doctors,
        status,
        rejectionReason,
      } = val;
      return (
        <>
          <tr className="text-center">
            <td> {idx + 1} </td>
            {/* <td> {userId} </td> */}
            <td> {transactionDate} </td>
            <td> {doctors.fullName} </td>
            <td>
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(grandTotalPrice)}{" "}
            </td>
            <td align="center">
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
            <td colSpan={1}></td>
            <td colSpan={1} className="text-left">
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
                        {completionDate}
                      </span>
                    </h6>
                    <h6>
                      Status:
                      <span
                        style={{ fontWeight: "normal" }}
                        className="text-justify"
                      >
                        {" "}
                        {status}
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
                    {status === "rejected" ? (
                      <>
                        <h6>
                          Rejection Reason:
                          <span
                            style={{ fontWeight: "normal" }}
                            className="text-justify"
                          >
                            {" "}
                            {rejectionReason}
                          </span>
                        </h6>
                      </>
                    ) : (
                      <>
                        <h6>
                          <span
                            style={{ fontWeight: "normal" }}
                            className="text-justify"
                          >
                            {" "}
                          </span>
                        </h6>
                      </>
                    )}
                    {status === "pending" ? (
                      <Button
                        className="mt-2"
                        onClick={() => this.uploadBuktiBtnHandler(idx)}
                      >
                        Upload Bukti Transfer
                      </Button>
                    ) : null}

                    {status === "rejected" ? (
                      <Button
                        className="mt-2"
                        onClick={() => this.uploadBuktiBtnHandler(idx)}
                      >
                        Re-upload Bukti Transfer
                      </Button>
                    ) : null}
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
          {/* Transaction sama history jadiin satu aja, kalo statusnya belum selese ada button buat upload bukti tf */}
          <h2>Transaction</h2>
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
        <Modal
          toggle={this.toggleModal}
          isOpen={this.state.modalOpen}
          className="edit-modal"
        >
          <ModalHeader toggle={this.toggleModal}>
            <caption>
              <h4>Upload Bukti Transfer</h4>
            </caption>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12 mt-3">
                <input
                  type="file"
                  name="Image"
                  onChange={(e) => {
                    this.fileChangeHandler(e, "selectedFile");
                  }}
                />
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
                  onClick={() =>
                    this.uploadBuktiTransfer(this.state.transactionsId)
                  }
                  type="contained"
                >
                  Submit
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
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
