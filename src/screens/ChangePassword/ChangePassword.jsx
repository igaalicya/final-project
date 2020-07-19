import React from "react";
import { connect } from "react-redux";
import { Alert } from "reactstrap";
import { Redirect } from "react-router-dom";
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
    userData: {},
    reset: false,
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

  getUserData = () => {
    Axios.get(`${API_URL}/users/id`, {
      params: {
        id: this.props.user.id,
      },
    })
      .then((res) => {
        this.setState({ userData: res.data });
        console.log(this.state.userData.password);
        console.log(this.state.userData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changePassHandler = () => {
    Axios.get(`${API_URL}/users/checkOldPassword/${this.props.user.id}`, {
      params: {
        password: this.state.editForm.oldPassword,
      },
    })

      .then((res) => {
        console.log(res);
        Axios.put(`${API_URL}/users/changePassword/${this.props.user.id}`, {
          password: this.state.editForm.newPassword,
          username: this.props.user.username,
          fullName: this.props.user.fullName,
          email: this.props.user.email,
          address: this.props.user.address,
          role: this.props.user.role,
        })
          .then((res) => {
            console.log(res);
            swal("success", "Your password successfully changed", "success");
            this.setState({ reset: true });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        swal("error", "Wrong old password", "error");
      });
  };

  componentDidMount() {
    this.getUserData();
  }

  render() {
    // const { password, newPassword } = this.state.editForm;
    if (this.state.reset) {
      return <Redirect to="/login" />;
    } else {
      return (
        <div style={{ display: "block" }}>
          {this.props.user.verified > 0 ? (
            <div className="container-pass">
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
                            this.inputHandler(
                              e,
                              "confirmNewPassword",
                              "editForm"
                            )
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
          ) : (
            <div className="container-pass-0">
              <Alert color="danger" className="ml-5">
                Not Allowed! You must verified your account to change password
              </Alert>
            </div>
          )}
        </div>
      );
    }
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
