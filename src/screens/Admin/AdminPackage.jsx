import React from "react";
import "./AdminMembers.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import swal from "sweetalert";
import Button from "../../components/Buttons/Button";
import TextField from "../../components/TextField/TextField";

class AdminPackage extends React.Component {
  state = {
    packageList: [],
    createForm: {
      packageName: "",
      image: "",
      price: 0,
      stock: 0,
      description: "",
    },
    editForm: {
      id: 0,
      packageName: "",
      image: "",
      price: 0,
      stock: 0,
      description: "",
    },
    activeUsers: [],
    modalOpen: false,
    selectedFile: null,
  };

  getPackageList = () => {
    Axios.get(`${API_URL}/package`)
      .then((res) => {
        this.setState({ packageList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderPackageList = () => {
    return this.state.packageList.map((val, idx) => {
      const { packageName, price, stock, id } = val;
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
            <td className="text-left"> {packageName}</td>
            <td> {price} </td>
            <td> {stock}</td>
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
                className="w-80 custom-btn-danger"
                type="contained"
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

  addPackageHandler = () => {
    let formData = new FormData();

    if (this.state.selectedFile) {
      formData.append(
        "file",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    }
    formData.append("packageData", JSON.stringify(this.state.createForm));

    Axios.post(`${API_URL}/package`, formData)
      .then((res) => {
        swal("Success", "Package Data has been added to the list", "success");
        this.getPackageList();
        this.setState({
          createForm: {
            packageName: "",
            image: "",
            price: "",
            stock: "",
            description: "",
          },
        });
        this.getPackageList();
      })
      .catch((err) => {
        swal("Error!", "Package data could not be added to the list", "error");
      });
  };

  editBtnHandler = (idx) => {
    this.setState({
      editForm: {
        ...this.state.packageList[idx],
      },
      modalOpen: true,
    });
  };

  editPackageHandler = () => {
    let formData = new FormData();
    if (this.state.selectedFile) {
      formData.append(
        "file",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    }
    formData.append("packageData", JSON.stringify(this.state.editForm));

    Axios.put(`${API_URL}/package/edit/${this.state.editForm.id}`, formData)
      .then((res) => {
        swal("Success!", "Package data has been edited", "success");
        this.setState({ modalOpen: false });
        this.getPackageList();
      })
      .catch((err) => {
        swal("Error!", "Package data could not be edited", "error");
        console.log(err);
      });
  };

  deleteHandler = (id) => {
    Axios.delete(`${API_URL}/package/${id}`)
      .then((res) => {
        swal("Success!", "Package data has been deleted", "success");
        this.getPackageList();
        console.log(id);
      })
      .catch((err) => {
        swal("Error!", "Package data could not be deleted", "error");
        console.log(err);
        console.log(id);
      });
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  componentDidMount() {
    this.getPackageList();
  }

  render() {
    return (
      <div className="container admin-container">
        <div className="dashboard">
          <caption className="p-3">
            <h2>package</h2>
          </caption>
          <table className="admin-table text-center">
            <thead>
              <tr>
                <th>No.</th>
                <th className="text-left">Package Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>{this.renderPackageList()}</tbody>
          </table>
        </div>
        <div className="admin-form-container p-4">
          <caption className="mb-4 mt-2">
            <h2>Add Package</h2>
          </caption>
          <div className="row">
            <div className="col-8">
              <TextField
                value={this.state.createForm.packageName}
                placeholder="Package Name"
                onChange={(e) =>
                  this.inputHandler(e, "packageName", "createForm")
                }
              />
            </div>
            <div className="col-4">
              <TextField
                value={this.state.createForm.price}
                placeholder="price"
                onChange={(e) => this.inputHandler(e, "price", "createForm")}
              />
            </div>
            <div className="col-6 mt-3">
              <TextField
                value={this.state.createForm.stock}
                placeholder="stock"
                onChange={(e) => this.inputHandler(e, "stock", "createForm")}
              />
            </div>
            <div className="col-12 mt-3">
              <input
                type="file"
                // className="custom-file-input"
                name="Image"
                onChange={(e) => {
                  this.fileChangeHandler(e, "selectedFile");
                }}
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
              <Button onClick={this.addPackageHandler} type="contained">
                Add Package
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
                  value={this.state.editForm.packageName}
                  placeholder="Full Name"
                  onChange={(e) =>
                    this.inputHandler(e, "packageName", "editForm")
                  }
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  className="custom-text-input h-100 pl-3"
                  value={this.state.editForm.price}
                  placeholder="price"
                  onChange={(e) => this.inputHandler(e, "price", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  className="custom-text-input h-100 pl-3"
                  value={this.state.editForm.stock}
                  placeholder="stock"
                  onChange={(e) => this.inputHandler(e, "stock", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <img
                  alt="..."
                  className="ml-4"
                  style={{ width: "30%" }}
                  src={this.state.editForm.image}
                />
                <input
                  type="file"
                  name="Image"
                  onChange={(e) => {
                    this.fileChangeHandler(e, "selectedFile");
                  }}
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
                  onClick={this.editPackageHandler}
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

export default AdminPackage;
