import React from "react";
import "./AdminMembers.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import swal from "sweetalert";
import { Button } from "reactstrap";
import TextField from "../../components/TextField/TextField";

class AdminDoctors extends React.Component {
  state = {
    doctorList: [],
    createForm: {
      fullName: "",
      image: "",
      specialist: "",
      address: "",
      phone: "",
      desc: "",
    },
    editForm: {
      id: 0,
      fullName: "",
      image: "",
      specialist: "",
      address: "",
      phone: "",
      desc: "",
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
      const { fullName, specialist, phone, address, id } = val;
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
            <td> {idx + 1} </td>
            <td className="text-left"> {fullName}</td>
            <td> {specialist} </td>
            <td> {phone}</td>
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
                onClick={() => this.deleteHandler(id)}
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

  addDoctorHandler = () => {
    Axios.post(`${API_URL}/doctors`, this.state.createForm)
      .then((res) => {
        swal("Success", "Your items has been added to the list", "success");
        this.getDoctorList();
        this.setState({
          createForm: {
            fullName: "",
            image: "",
            specialist: "",
            address: "",
            phone: "",
            desc: "",
          },
        });
        this.getDoctorList();
      })
      .catch((err) => {
        swal("Error!", "Your item could not be added to the list", "error");
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
        console.log(id);
      })
      .catch((err) => {
        swal("Error!", "Doctor data could not be deleted", "error");
        console.log(err);
        console.log(id);
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
      <div className="container admin-container">
        <div className="dashboard">
          <caption className="p-3">
            <h2>Doctors</h2>
          </caption>
          <table className="admin-table text-center">
            <thead>
              <tr>
                <th>No.</th>
                <th className="text-left">Full Name</th>
                <th>specialist</th>
                <th>Email</th>
                <th>Address</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>{this.renderDoctorList()}</tbody>
          </table>
        </div>
        <div className="admin-form-container p-4">
          <caption className="mb-4 mt-2">
            <h2>Add Vaccine</h2>
          </caption>
          <div className="row">
            <div className="col-8">
              <TextField
                value={this.state.createForm.fullName}
                placeholder="Doctor Name"
                onChange={(e) => this.inputHandler(e, "fullName", "createForm")}
              />
            </div>
            <div className="col-4">
              <TextField
                value={this.state.createForm.specialist}
                placeholder="Specialist"
                onChange={(e) =>
                  this.inputHandler(e, "specialist", "createForm")
                }
              />
            </div>
            <div className="col-6 mt-3">
              <TextField
                value={this.state.createForm.address}
                placeholder="Address"
                onChange={(e) => this.inputHandler(e, "address", "createForm")}
              />
            </div>
            <div className="col-6 mt-3">
              <TextField
                value={this.state.createForm.phone}
                placeholder="Phone"
                onChange={(e) => this.inputHandler(e, "phone", "createForm")}
              />
            </div>
            <div className="col-12 mt-3">
              <TextField
                value={this.state.createForm.image}
                placeholder="Doctor's Photo"
                onChange={(e) => this.inputHandler(e, "image", "createForm")}
              />
            </div>
            <div className="col-12 mt-3">
              <textarea
                value={this.state.createForm.desc}
                onChange={(e) => this.inputHandler(e, "desc", "createForm")}
                style={{ resize: "none" }}
                placeholder="Description"
                className="custom-text-input"
              ></textarea>
            </div>
            <div className="col-3 mt-3">
              <Button onClick={this.addDoctorHandler} type="contained">
                Add Doctor
              </Button>
            </div>
          </div>
        </div>

        <Modal
          toggle={this.toggleModal}
          isOpen={this.state.modalOpen}
          className="edit-modal"
        >
          <ModalHeader toggle={this.toggleModal}>
            <caption>
              <h3>Edit Data</h3>
            </caption>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12 mt-3">
                <input
                  type="text"
                  className="custom-text-input h-100 pl-3"
                  value={this.state.editForm.fullName}
                  placeholder="Full Name"
                  onChange={(e) => this.inputHandler(e, "fullName", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  className="custom-text-input h-100 pl-3"
                  value={this.state.editForm.specialist}
                  placeholder="Specialist"
                  onChange={(e) =>
                    this.inputHandler(e, "specialist", "editForm")
                  }
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  className="custom-text-input h-100 pl-3"
                  value={this.state.editForm.address}
                  placeholder="Address"
                  onChange={(e) => this.inputHandler(e, "address", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  className="custom-text-input h-100 pl-3"
                  value={this.state.editForm.phone}
                  placeholder="Phone"
                  onChange={(e) => this.inputHandler(e, "phone", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  className="custom-text-input h-100 pl-3"
                  value={this.state.editForm.image}
                  placeholder="Doctor's Photos"
                  onChange={(e) => this.inputHandler(e, "image", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <textarea
                  value={this.state.editForm.desc}
                  onChange={(e) => this.inputHandler(e, "desc", "editForm")}
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
