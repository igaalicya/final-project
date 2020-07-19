import React from "react";
import { connect } from "react-redux";
import { Card, Row, Col, Modal, ModalHeader, ModalBody } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import swal from "sweetalert";
import "./Profile.css";
import Button from "../../components/Buttons/Button";

class ProfileUser extends React.Component {
  state = {
    userData: {
      username: "",
      fullName: "",
      address: "",
      password: "",
      email: "",
      phone: "",
      role: "",
      id: 0,
    },
    // editForm: {
    //   username: "",
    //   fullName: "",
    //   // address: "",
    //   password: "",
    //   email: "",
    //   role: "",
    //   id: 0,
    // },
    // userData: {},
    editForm: {},
    modalOpen: false,
  };

  getUserData = () => {
    Axios.get(`${API_URL}/users/id`, {
      params: {
        id: this.props.user.id,
      },
    })
      .then((res) => {
        this.setState({ userData: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
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

  editBtnHandler = () => {
    this.setState({
      editForm: {
        ...this.state.userData,
      },
      modalOpen: true,
    });
  };

  editUserHandler = () => {
    Axios.put(
      `${API_URL}/users/editProfileUser/${this.props.user.id}`,
      this.state.editForm
    )
      .then((res) => {
        swal("Success!", "Your data has been edited", "success");
        this.setState({ modalOpen: false });
        this.getUserData();
      })
      .catch((err) => {
        swal("Error!", "Your data could not be edited", "error");
        console.log(err);
      });
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  componentDidMount() {
    this.getUserData();
  }

  render() {
    const { fullName, address, phone, email } = this.state.userData;

    return (
      <div style={{ display: "block" }}>
        <div className="container-profile">
          <Row className="justify-content-center pt-5">
            <Col lg="8">
              <Card>
                <div className="px-4">
                  {/* <Row className="justify-content-center">
                    <div className="profile-image">
                      <img
                        alt="..."
                        className="profile-image rounded mt-3"
                        src="https://cdn1.iconfinder.com/data/icons/free-education-set/31/user03-128.png"
                      />
                    </div>
                  </Row> */}
                  <div className="text-center mt-5">
                    <h3>{fullName}</h3>
                    {/* <h6 className="text-secondary">{username}</h6> */}
                    <h6 className="">{email}</h6>
                    {phone ? (
                      <h6 className="font-weight-light mt-4">{phone}</h6>
                    ) : null}
                    {address ? (
                      <h6 className="font-weight-light mt-4">{address}</h6>
                    ) : null}
                  </div>
                  <div className="py-3 text-center">
                    <Row className="justify-content-center">
                      <Button
                        onClick={this.editBtnHandler}
                        className="m-2"
                        type="contained"
                        value="buy"
                      >
                        Edit Profile
                      </Button>
                    </Row>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
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
                  value={this.state.editForm.username}
                  placeholder="Username"
                  onChange={(e) => this.inputHandler(e, "username", "editForm")}
                  disabled
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  className="custom-text-input h-100 pl-3"
                  value={this.state.editForm.email}
                  placeholder="Email"
                  onChange={(e) => this.inputHandler(e, "email", "editForm")}
                  disabled
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
                  value={this.state.editForm.phone}
                  placeholder="Phone Number"
                  onChange={(e) => this.inputHandler(e, "phone", "editForm")}
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ProfileUser);
