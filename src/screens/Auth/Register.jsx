import React from "react";
import "./Auth.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUnlock,
  faUser,
  faAt,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons/";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { registerHandler } from "../../redux/actions";

class Register extends React.Component {
  state = {
    registerForm: {
      fullName: "",
      username: "",
      email: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  };

  componentDidUpdate() {
    if (this.props.user.id) {
      const cookie = new Cookies();
      cookie.set("authData", JSON.stringify(this.props.user), { path: "/" });
    }
  }

  inputHandler = (e, field, form) => {
    const { value } = e.target;
    this.setState({
      [form]: {
        ...this.state[form],
        [field]: value,
      },
    });

    console.log(e.target);
  };

  registerBtnHandler = () => {
    const {
      username,
      fullName,
      password,
      email,
      address,
    } = this.state.registerForm;

    // let verifyToken = Math.floor(Math.random() * 1000000000000000);
    let newUser = {
      username,
      fullName,
      password,
      email,
      address,
    };

    this.props.onRegister(newUser);
  };

  render() {
    if (this.props.user.id > 0) {
      return <Redirect to="/" />;
    }
    return (
      <div style={{ display: "block" }}>
        <div className="container-register">
          <Row className="justify-content-center pt-5">
            <Col lg="4">
              <Card>
                <CardHeader className="pb-2 mb-0">
                  <h2 className="text-center font-weight-bold text-black">
                    Register
                  </h2>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form">
                    <FormGroup className="mb-3">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FontAwesomeIcon
                              icon={faUser}
                              style={{ fontSize: 14 }}
                            />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          value={this.state.registerForm.fullName}
                          onChange={(e) =>
                            this.inputHandler(e, "fullName", "registerForm")
                          }
                          placeholder="Full Name"
                          type="text"
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="mb-3">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FontAwesomeIcon
                              icon={faAt}
                              style={{ fontSize: 14 }}
                            />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          value={this.state.registerForm.username}
                          onChange={(e) =>
                            this.inputHandler(e, "username", "registerForm")
                          }
                          placeholder="Username"
                          type="text"
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="mb-3">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FontAwesomeIcon
                              icon={faEnvelope}
                              style={{ fontSize: 14 }}
                            />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          value={this.state.registerForm.email}
                          onChange={(e) =>
                            this.inputHandler(e, "email", "registerForm")
                          }
                          placeholder="Email"
                          type="email"
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="mb-3">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FontAwesomeIcon
                              icon={faMapMarkerAlt}
                              style={{ fontSize: 14 }}
                            />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          value={this.state.registerForm.address}
                          onChange={(e) =>
                            this.inputHandler(e, "address", "registerForm")
                          }
                          placeholder="Address"
                          type="text"
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FontAwesomeIcon
                              icon={faUnlock}
                              style={{ fontSize: 14 }}
                            />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          value={this.state.registerForm.password}
                          onChange={(e) =>
                            this.inputHandler(e, "password", "registerForm")
                          }
                          placeholder="Password"
                          type="password"
                          autoComplete="off"
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FontAwesomeIcon
                              icon={faUnlock}
                              style={{ fontSize: 14 }}
                            />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          value={this.state.registerForm.confirmPassword}
                          onChange={(e) =>
                            this.inputHandler(
                              e,
                              "confirmPassword",
                              "registerForm"
                            )
                          }
                          placeholder="Confirm Password"
                          type="password"
                          autoComplete="off"
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      <Button
                        onClick={this.registerBtnHandler}
                        className="my-4"
                        color="primary"
                        type="button"
                        block
                      >
                        REGISTER
                      </Button>
                      <p className="text-muted">
                        Have an account? <Link to="/login">Login</Link>{" "}
                      </p>
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
  onRegister: registerHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
