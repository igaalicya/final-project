import React from "react";
import { connect } from "react-redux";
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
import "./ForgetPassword.css";
import swal from "sweetalert";

class ResetPassword extends React.Component {
  state = {
    userReset: {},
    passwordData: {
      password: "",
      confirmPassword: "",
    },
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

  getUserReset = () => {
    console.log(this.props.match.params.userId);
    console.log(this.props.match.params.username);
    Axios.get(
      `${API_URL}/users/reset/${this.props.match.params.userId}/${this.props.match.params.username}`
    )
      .then((res) => {
        console.log(res.data);
        this.setState({
          userReset: res.data,
        });
        console.log(this.state.userReset.username);
        console.log(this.state.userReset);
      })
      .catch((err) => {
        this.setState({ notfound: true });
        console.log(err);
      });
  };

  resetPasswordHandler = () => {
    let resetData = {
      ...this.state.userReset,
      password: this.state.passwordData.password,
    };
    console.log(resetData);
    if (this.state.passwordData.password) {
      Axios.put(`${API_URL}/users/resetPassword`, resetData)
        .then((res) => {
          console.log(res.data);
          swal("Success", "Your password has been reset", "success");
          this.setState({ reset: true });
        })
        .catch((err) => {
          console.log(err);
          swal("Error", "Your password has not been reset", "error");
        });
    } else {
      swal("Error", "password confirmation didnt match", "error");
    }
  };

  componentDidMount() {
    this.getUserReset();
  }

  render() {
    if (this.state.reset) {
      return <Redirect to="/login" />;
    } else {
      return (
        <div style={{ display: "block" }}>
          <div className="container-pass">
            <Row className="justify-content-center pt-5">
              <Col lg="4">
                <Card>
                  <CardHeader className="pb-2">
                    <h2 className="text-center font-weight-bold text-black">
                      Reset Password
                    </h2>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form role="form">
                      <Input
                        value={this.state.passwordData.password}
                        onChange={(e) =>
                          this.inputHandler(e, "password", "passwordData")
                        }
                        placeholder="New Password"
                        type="password"
                      />
                      <Input
                        value={this.state.passwordData.confirmPassword}
                        onChange={(e) =>
                          this.inputHandler(
                            e,
                            "confirmPassword",
                            "passwordData"
                          )
                        }
                        placeholder="Confirm New Password"
                        type="password"
                      />
                      <div className="text-center">
                        <Button
                          onClick={this.resetPasswordHandler}
                          className="my-4"
                          color="primary"
                          type="button"
                          block
                        >
                          RESET
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
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ResetPassword);
