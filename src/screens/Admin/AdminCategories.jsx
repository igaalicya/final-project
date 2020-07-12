import React from "react";
import "./AdminMembers.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import swal from "sweetalert";
// import { Button } from "reactstrap";
import Button from "../../components/Buttons/Button";
import TextField from "../../components/TextField/TextField";

class AdminCategories extends React.Component {
  state = {
    categoryList: [],
    createForm: {
      categoryName: "",
    },
    editForm: {
      id: 0,
      categoryName: "",
    },
    activeUsers: [],
    modalOpen: false,
    selectedFile: null,
  };

  getCategoryList = () => {
    Axios.get(`${API_URL}/categories`)
      .then((res) => {
        this.setState({ categoryList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderCategoryList = () => {
    return this.state.categoryList.map((val, idx) => {
      const { categoryName, id } = val;
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
            <td className="text-left"> {categoryName}</td>
            <td align="right">
              <Button
                onClick={() => this.editBtnHandler(idx)}
                className="w-80"
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

  addCategoriesHandler = () => {
    Axios.post(`${API_URL}/categories`, this.state.createForm)
      .then((res) => {
        swal(
          "Success",
          "Categories Data has been added to the list",
          "success"
        );
        this.getCategoryList();
        this.setState({
          createForm: {
            categoryName: "",
          },
        });
        this.getCategoryList();
      })
      .catch((err) => {
        swal(
          "Error!",
          "Categories data could not be added to the list",
          "error"
        );
      });
  };

  editBtnHandler = (idx) => {
    this.setState({
      editForm: {
        ...this.state.categoryList[idx],
      },
      modalOpen: true,
    });
  };

  editCategoriesHandler = () => {
    Axios.put(
      `${API_URL}/categories/edit/${this.state.editForm.id}`,
      this.state.editForm
    )
      .then((res) => {
        swal("Success!", "Categories data has been edited", "success");
        this.setState({ modalOpen: false });
        this.getCategoryList();
      })
      .catch((err) => {
        swal("Error!", "Categories data could not be edited", "error");
        console.log(err);
      });
  };

  deleteHandler = (id) => {
    Axios.delete(`${API_URL}/categories/${id}`)
      .then((res) => {
        swal("Success!", "Categories data has been deleted", "success");
        this.getCategoryList();
        console.log(id);
      })
      .catch((err) => {
        swal("Error!", "Categories data could not be deleted", "error");
        console.log(err);
        console.log(id);
      });
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  componentDidMount() {
    this.getCategoryList();
  }

  render() {
    return (
      <div className="container admin-container">
        <div className="dashboard">
          <caption className="p-3">
            <h2>Category</h2>
          </caption>
          <table className="admin-table text-center">
            <thead>
              <tr>
                <th>No.</th>
                <th className="text-left">CategoryName</th>

                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>{this.renderCategoryList()}</tbody>
          </table>
        </div>
        <div className="admin-form-container p-4">
          <caption className="mb-4 mt-2">
            <h2>Add Category</h2>
          </caption>
          <div className="row">
            <div className="col-8">
              <TextField
                value={this.state.createForm.categoryName}
                placeholder="Categories Name"
                onChange={(e) =>
                  this.inputHandler(e, "categoryName", "createForm")
                }
              />
            </div>
            <div className="col-3">
              <Button onClick={this.addCategoriesHandler} type="outlined">
                Add Categories
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
                  value={this.state.editForm.categoryName}
                  placeholder="Full Name"
                  onChange={(e) =>
                    this.inputHandler(e, "categoryName", "editForm")
                  }
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
                  onClick={this.editCategoriesHandler}
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

export default AdminCategories;
