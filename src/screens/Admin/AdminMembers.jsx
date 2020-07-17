import React from "react";
import "./AdminMembers.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import swal from "sweetalert";
import Button from "../../components/Buttons/Button";

class AdminMembers extends React.Component {
  state = {
    userList: [],
    editForm: {
      id: 0,
      username: "",
      fullName: "",
      address: "",
      email: "",
      role: "",
    },
    activeUsers: [],
    modalOpen: false,
  };

  getUserList = () => {
    Axios.get(`${API_URL}/users/all`)
      .then((res) => {
        console.log(res.data);
        this.setState({ userList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderUserList = () => {
    return this.state.userList.map((val, idx) => {
      const { id, username, fullName, email, role } = val;
      return (
        <tr
          key={idx.toString()}
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
          <td> {username} </td>
          <td> {fullName}</td>
          <td> {role} </td>
          <td> {email}</td>
          {/* <td> {address}</td> */}
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
        ...this.state.userList[idx],
      },
      modalOpen: true,
    });
  };

  editUserHandler = () => {
    Axios.put(
      `${API_URL}/users/editProfileAdmin/${this.state.editForm.id}`,
      this.state.editForm
    )
      .then((res) => {
        swal("Success!", "User data has been edited", "success");
        this.setState({ modalOpen: false });
        this.getUserList();
      })
      .catch((err) => {
        swal("Error!", "User data could not be edited", "error");
        console.log(err);
      });
  };

  deleteHandler = (id) => {
    Axios.delete(`${API_URL}/users/${id}`)
      .then((res) => {
        swal("Success!", "User data has been deleted", "success");
        this.getUserList();
      })
      .catch((err) => {
        swal("Error!", "User data could not be deleted", "error");
        console.log(err);
      });
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  componentDidMount() {
    this.getUserList();
  }

  render() {
    return (
      <div className="container admin-container">
        <div className="dashboard">
          <caption className="p-3">
            <h2>Members</h2>
          </caption>
          <table className="admin-table text-center">
            <thead>
              <tr>
                <th>No.</th>
                <th>Username</th>
                <th>Full Name</th>
                <th>Role</th>
                <th>Email</th>
                {/* <th>address</th> */}
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>{this.renderUserList()}</tbody>
          </table>
        </div>

        <Modal
          toggle={this.toggleModal}
          isOpen={this.state.modalOpen}
          className="edit-modal"
        >
          <ModalHeader toggle={this.toggleModal}>
            <caption>
              <h3>Edit User</h3>
            </caption>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12">
                <input
                  type="text"
                  className="custom-text-input h-100 pl-3"
                  value={this.state.editForm.username}
                  placeholder="Username"
                  onChange={(e) => this.inputHandler(e, "username", "editForm")}
                />
              </div>
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
                  value={this.state.editForm.email}
                  placeholder="Email"
                  onChange={(e) => this.inputHandler(e, "email", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  className="custom-text-input h-100 pl-3"
                  value={this.state.editForm.address}
                  placeholder="address"
                  onChange={(e) => this.inputHandler(e, "address", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <select
                  value={this.state.editForm.role}
                  className="custom-text-input h-100 pl-3"
                  onChange={(e) => this.inputHandler(e, "role", "editForm")}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
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
                  onClick={this.editUserHandler}
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

export default AdminMembers;
