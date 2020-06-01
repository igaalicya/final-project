import React from "react";
import "./Auth.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUnlock } from "@fortawesome/free-solid-svg-icons/";
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
import { loginHandler } from "../../redux/actions";

class Login extends React.Component {
  state = {
    loginForm: {
      username: "",
      password: "",
      // showPassword: false,
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

  loginBtnHandler = () => {
    const { username, password } = this.state.loginForm;

    let newUser = {
      username,
      password,
    };

    this.props.onLogin(newUser);

    console.log(this.state.loginForm.username);
  };

  render() {
    if (this.props.user.id > 0) {
      return <Redirect to="/" />;
    }
    return (
      <div style={{ display: "block" }}>
        <div className="container-login p-5">
          <Row className="justify-content-center pt-5">
            <Col lg="4">
              <Card>
                <CardHeader className="pb-2">
                  <h2 className="text-center font-weight-bold text-black">
                    Login
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
                          value={this.state.loginForm.username}
                          onChange={(e) =>
                            this.inputHandler(e, "username", "loginForm")
                          }
                          placeholder="Username"
                          type="text"
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
                          value={this.state.loginForm.password}
                          onChange={(e) =>
                            this.inputHandler(e, "password", "loginForm")
                          }
                          placeholder="Password"
                          type="password"
                          autoComplete="off"
                        />
                      </InputGroup>
                    </FormGroup>
                    {/* <div className="custom-control custom-control-alternative custom-checkbox">
                      <input className="custom-control-input" type="checkbox" />
                      <label className="custom-control-label">
                        <span className="text-muted">Remember me</span>
                      </label>
                    </div> */}
                    <div className="text-center">
                      <Button
                        onClick={this.loginBtnHandler}
                        className="my-4"
                        color="primary"
                        type="button"
                        block
                      >
                        LOGIN
                      </Button>
                      <p className="text-muted">
                        Dont have account? <Link to="/register">Register</Link>{" "}
                        <br />
                        Forgot Password? <Link to="/forgot">
                          Click here
                        </Link>{" "}
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
  onLogin: loginHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
