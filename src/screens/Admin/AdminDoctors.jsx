import React from "react";
import "./AdminMembers.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import swal from "sweetalert";
import { Button } from "reactstrap";

class AdminDoctors extends React.Component {
  state = {
    doctorList: [],
    editForm: {
      id: 0,
      fullName: "",
      address: "",
      email: "",
      image: "",
    },
    activeUsers: [],
    modalOpen: false,
  };

  getDoctorList = () => {
    Axios.get(`${API_URL}/doctors`)
      .then((res) => {
        this.setState({ doctorList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderDoctorList = () => {
    return this.state.doctorList.map((val, idx) => {
      const { id, fullName, email, address } = val;
      return (
        <>
          <tr
            onClick={() => {
              if (this.state.activeUsers.includes(idx)) {
                this.setState({
                  activeUsers: [
                    ...this.state.activeUsers.filter((item) => item !== idx),
                  ],
                });
              } else {
                this.setState({
                  activeUsers: [...this.state.activeUsers, idx],
                });
              }
            }}
          >
            <td> {id} </td>
            <td> {fullName}</td>
            <td> {email}</td>
            <td> {address}</td>
            <td>
              <Button
                onClick={() => this.editBtnHandler(idx)}
                className="w-100"
                type="contained"
              >
                Edit
              </Button>
            </td>
            <td>
              <Button
                onClick={() => this.deleteHandler(idx)}
                className="w-80"
                type="outlined"
              >
                Delete
              </Button>
            </td>
          </tr>
        </>
      );
    });
  };

  inputHandler = (e, field, form) => {
    let { value } = e.target;
    this.setState({
      [form]: {
        ...this.state[form],
        [field]: value,
      },
    });
  };

  editBtnHandler = (idx) => {
    this.setState({
      editForm: {
        ...this.state.doctorList[idx],
      },
      modalOpen: true,
    });
  };

  editDoctorHandler = () => {
    Axios.put(
      `${API_URL}/doctors/${this.state.editForm.id}`,
      this.state.editForm
    )
      .then((res) => {
        swal("Success!", "Doctor data has been edited", "success");
        this.setState({ modalOpen: false });
        this.getDoctorList();
      })
      .catch((err) => {
        swal("Error!", "Doctor data could not be edited", "error");
        console.log(err);
      });
  };

  deleteHandler = (id) => {
    Axios.delete(`${API_URL}/doctors/${id}`)
      .then((res) => {
        swal("Success!", "Doctor data has been deleted", "success");
        this.getDoctorList();
      })
      .catch((err) => {
        swal("Error!", "Doctor data could not be deleted", "error");
        console.log(err);
      });
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  componentDidMount() {
    this.getDoctorList();
  }

  render() {
    return (
      <div className="container py-4">
        <div className="dashboard">
          <caption className="p-3">
            <h2>Doctors</h2>
          </caption>
          <table className="admin-table text-center">
            <thead>
              <tr>
                <th>No.</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Address</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>{this.renderDoctorList()}</tbody>
          </table>
        </div>

        <Modal
          toggle={this.toggleModal}
          isOpen={this.state.modalOpen}
          className="edit-modal"
        >
          <ModalHeader toggle={this.toggleModal}>
            <caption>
              <h3>Edit Doctor's Data</h3>
            </caption>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12 mt-3">
                <input
                  type="text"
                  value={this.state.editForm.fullName}
                  placeholder="Full Name"
                  onChange={(e) => this.inputHandler(e, "fullName", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  value={this.state.editForm.email}
                  placeholder="Email"
                  onChange={(e) => this.inputHandler(e, "email", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  value={this.state.editForm.address}
                  placeholder="Address"
                  onChange={(e) => this.inputHandler(e, "address", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  value={this.state.editForm.image}
                  placeholder="Photos"
                  onChange={(e) => this.inputHandler(e, "image", "editForm")}
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
                  onClick={this.editDoctorHandler}
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

export default AdminDoctors;
