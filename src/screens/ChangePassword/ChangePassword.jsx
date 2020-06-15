import React from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  Form,
  Input,
  Button,
} from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import "./ChangePassword.css";
import swal from "sweetalert";
import { changePasswordHandler } from "../../redux/actions";

class ChangePassword extends React.Component {
  state = {
    editForm: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    userData: {
      password: "",
      id: 0,
    },
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

  getOldPassword = () => {
    Axios.get(`${API_URL}/users/${this.props.user.id}`)
      .then((res) => {
        this.setState({ userData: res.data });
        console.log(this.state.userData.password);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changePassHandler = () => {
    // Axios.patch(`${API_URL}/users/${this.props.user.id}`, {
    //   password: this.state.newPassword,
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    const {
      oldPassword,
      newPassword,
      confirmNewPassword,
    } = this.state.editForm;
    console.log(this.state.editForm);
    const { id, password } = this.state.userData;
    if (oldPassword === password && newPassword === confirmNewPassword) {
      let passwordData = {
        newPassword,
        id,
      };

      this.props.onChangePassword(passwordData);
    } else {
      swal("Gagal", "Password gagal diubah", "error");
    }
    this.setState({
      editForm: {
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
    });
  };

  componentDidMount() {
    this.getOldPassword();
  }

  render() {
    // const { password, newPassword } = this.state.editForm;
    return (
      <div style={{ display: "block" }}>
        <div className="container-pass p-5">
          <Row className="justify-content-center pt-5">
            <Col lg="4">
              <Card>
                <CardHeader className="pb-2">
                  <h2 className="text-center font-weight-bold text-black">
                    Change Password
                  </h2>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form">
                    <Input
                      value={this.state.editForm.oldPassword}
                      onChange={(e) =>
                        this.inputHandler(e, "oldPassword", "editForm")
                      }
                      placeholder="Old Password"
                      type="password"
                    />
                    <Input
                      value={this.state.editForm.newPassword}
                      className="mt-2"
                      onChange={(e) =>
                        this.inputHandler(e, "newPassword", "editForm")
                      }
                      placeholder="New Password"
                      type="password"
                      autoComplete="off"
                    />
                    <Input
                      value={this.state.editForm.confirmNewPassword}
                      className="mt-2"
                      onChange={(e) =>
                        this.inputHandler(e, "confirmNewPassword", "editForm")
                      }
                      placeholder="Confirm New Password"
                      type="password"
                      autoComplete="off"
                    />
                    <div className="text-center">
                      <Button
                        onClick={this.changePassHandler}
                        className="my-4"
                        color="primary"
                        type="button"
                        block
                      >
                        CHANGE
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  onChangePassword: changePasswordHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
