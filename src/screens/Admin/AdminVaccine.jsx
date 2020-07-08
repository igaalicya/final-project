import React from "react";
import "./AdminMembers.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import swal from "sweetalert";
import { Button } from "reactstrap";
import TextField from "../../components/TextField/TextField";

class AdminVaccine extends React.Component {
  state = {
    selectedFile: null,
    VaccineList: [],
    createForm: {
      vaccineName: "",
      price: "",
      ageOfDose: "",
      description: "",
      brand: "",
      image: "",
      stock: 0,
    },
    editForm: {
      id: 0,
      vaccineName: "",
      price: 0,
      ageOfDose: 0,
      description: "",
      brand: "",
      image: "",
      stock: 0,
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
      const { vaccineName, price, ageOfDose, brand, stock } = val;
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
            <td> {vaccineName} </td>
            <td> {price} </td>
            <td> {ageOfDose}</td>
            <td> {brand}</td>
            <td> {stock} </td>
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

  fileChangeHandler = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  addVaccineHandler = () => {
    let formData = new FormData();

    formData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    formData.append("vaccinesData", JSON.stringify(this.state.createForm));

    Axios.post(`${API_URL}/vaccines`, formData)
      .then((res) => {
        swal("Success", "Your items has been added to the list", "success");
        this.getVaccineList();
        this.setState({
          createForm: {
            vaccineName: "",
            price: "",
            ageOfDose: "",
            description: "",
            brand: "",
            image: "",
            stock: 0,
          },
        });
        this.getVaccineList();
      })
      .catch((err) => {
        swal("Error!", "Your item could not be added to the list", "error");
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
      <div className="container admin-container">
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
                <th>Stock</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>{this.renderVaccineList()}</tbody>
          </table>
        </div>
        <div className="admin-form-container p-4">
          <caption className="mb-4 mt-2">
            <h2>Add Vaccine</h2>
          </caption>
          <div className="row">
            <div className="col-8">
              <TextField
                value={this.state.createForm.vaccineName}
                placeholder="Vaccine Name"
                onChange={(e) =>
                  this.inputHandler(e, "vaccineName", "createForm")
                }
              />
            </div>
            <div className="col-4">
              <TextField
                value={this.state.createForm.price}
                placeholder="Price"
                onChange={(e) => this.inputHandler(e, "price", "createForm")}
              />
            </div>
            <div className="col-6 mt-3">
              <TextField
                value={this.state.createForm.ageOfDose}
                placeholder="Age of Dose"
                onChange={(e) =>
                  this.inputHandler(e, "ageOfDose", "createForm")
                }
              />
            </div>
            <div className="col-6 mt-3">
              <TextField
                value={this.state.createForm.brand}
                placeholder="Brand"
                onChange={(e) => this.inputHandler(e, "brand", "createForm")}
              />
            </div>
            <div className="col-6 mt-3">
              <TextField
                value={this.state.createForm.stock}
                placeholder="Stock"
                onChange={(e) => this.inputHandler(e, "stock", "createForm")}
              />
            </div>
            <div className="col-12 mt-3">
              <input
                type="file"
                name="Image"
                onChange={this.fileChangeHandler}
              />
            </div>
            <div className="col-12 mt-3">
              <textarea
                value={this.state.createForm.description}
                onChange={(e) =>
                  this.inputHandler(e, "description", "createForm")
                }
                style={{ resize: "none" }}
                placeholder="Description"
                className="custom-text-input"
              ></textarea>
            </div>
            <div className="col-3 mt-3">
              <Button onClick={this.addVaccineHandler} type="contained">
                Add Vaccine
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
              <h3>Edit Vaccine</h3>
            </caption>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12">
                <input
                  type="text"
                  className="custom-text-input h-100 pl-3"
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
                  className="custom-text-input h-100 pl-3"
                  value={this.state.editForm.price}
                  placeholder="Price"
                  onChange={(e) => this.inputHandler(e, "price", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  className="custom-text-input h-100 pl-3"
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
                  value={this.state.editForm.brand}
                  className="custom-text-input h-100 pl-3"
                  onChange={(e) => this.inputHandler(e, "brand", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  value={this.state.editForm.stock}
                  className="custom-text-input h-100 pl-3"
                  onChange={(e) => this.inputHandler(e, "stock", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  className="custom-text-input h-100 pl-3"
                  value={this.state.editForm.image}
                  placeholder="Image"
                  onChange={(e) => this.inputHandler(e, "image", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <textarea
                  value={this.state.editForm.description}
                  onChange={(e) =>
                    this.inputHandler(e, "description", "editForm")
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
