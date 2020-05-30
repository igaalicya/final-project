import React from "react";
import "./AdminMembers.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import swal from "sweetalert";
import { Button } from "reactstrap";

class AdminVaccine extends React.Component {
  state = {
    VaccineList: [],
    editForm: {
      id: 0,
      vaccineName: "",
      price: "",
      ageOfDose: "",
      desc: "",
      brand: "",
    },
    activeUsers: [],
    modalOpen: false,
  };

  getVaccineList = () => {
    Axios.get(`${API_URL}/vaccines`)
      .then((res) => {
        this.setState({ VaccineList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderVaccineList = () => {
    return this.state.VaccineList.map((val, idx) => {
      const { id, vaccineName, price, ageOfDose, brand } = val;
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
            <td> {vaccineName} </td>
            <td> {price} </td>
            <td> {ageOfDose}</td>
            <td> {brand}</td>
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
        ...this.state.VaccineList[idx],
      },
      modalOpen: true,
    });
  };

  editVaccineHandler = () => {
    Axios.put(
      `${API_URL}/vaccines/${this.state.editForm.id}`,
      this.state.editForm
    )
      .then((res) => {
        swal("Success!", "Vaccine data has been edited", "success");
        this.setState({ modalOpen: false });
        this.getVaccineList();
      })
      .catch((err) => {
        swal("Error!", "Vaccine data could not be edited", "error");
        console.log(err);
      });
  };

  deleteHandler = (id) => {
    Axios.delete(`${API_URL}/vaccines/${id}`)
      .then((res) => {
        swal("Success!", "Vaccine data has been deleted", "success");
        this.getVaccineList();
      })
      .catch((err) => {
        swal("Error!", "Vaccine data could not be deleted", "error");
        console.log(err);
      });
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  componentDidMount() {
    this.getVaccineList();
  }

  render() {
    return (
      <div className="container py-4">
        <div className="dashboard">
          <caption className="p-3">
            <h2>Vaccine</h2>
          </caption>
          <table className="admin-table text-center">
            <thead>
              <tr>
                <th>No.</th>
                <th>Vaccine Name</th>
                <th>Price</th>
                <th>Age of dose</th>
                <th>Merk</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>{this.renderVaccineList()}</tbody>
          </table>
        </div>

        <Modal
          toggle={this.toggleModal}
          isOpen={this.state.modalOpen}
          className="edit-modal"
        >
          <ModalHeader toggle={this.toggleModal}>
            <caption>
              <h3>Edit Vaccine</h3>
            </caption>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12">
                <input
                  type="text"
                  value={this.state.editForm.vaccineName}
                  placeholder="Vaccine Name"
                  onChange={(e) =>
                    this.inputHandler(e, "vaccineName", "editForm")
                  }
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  value={this.state.editForm.price}
                  placeholder="Price"
                  onChange={(e) => this.inputHandler(e, "price", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  value={this.state.editForm.ageOfDose}
                  placeholder="Age Of Dose"
                  onChange={(e) =>
                    this.inputHandler(e, "ageOfDose", "editForm")
                  }
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  value={this.state.editForm.desc}
                  placeholder="Description"
                  onChange={(e) => this.inputHandler(e, "desc", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  value={this.state.editForm.brand}
                  className="custom-text-input h-100 pl-3"
                  onChange={(e) => this.inputHandler(e, "brand", "editForm")}
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
                  onClick={this.editVaccineHandler}
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

export default AdminVaccine;
