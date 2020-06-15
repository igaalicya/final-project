import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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

class ChangePassword extends React.Component {
  state = {
    editForm: {
      id: 0,
      password: "",
      newPassword: "",
      confirmNewPassword: "",
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
        this.setState({ editForm: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changePassHandler = () => {
    Axios.patch(`${API_URL}/users/${this.props.user.id}`, {
      password: this.state.newPassword,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getOldPassword();
  }

  render() {
    const { password, newPassword } = this.state.editForm;
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
                      onChange={(e) =>
                        this.inputHandler(e, "password", "editForm")
                      }
                      placeholder="Old Password"
                      type="text"
                    />
                    <Input
                      className="mt-2"
                      onChange={(e) =>
                        this.inputHandler(e, "newPassword", "editForm")
                      }
                      placeholder="New Password"
                      type="password"
                      autoComplete="off"
                    />
                    <Input
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

export default connect(mapStateToProps)(ChangePassword);
