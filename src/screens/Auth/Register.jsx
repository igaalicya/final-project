import React from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUnlock,
  faUser,
  faAt,
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

class Register extends React.Component {
  render() {
    return (
      <div style={{ display: "block" }}>
        <div className="container-register p-5">
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
                        <Input placeholder="Full Name" type="text" />
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
                        <Input placeholder="Username" type="text" />
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
                        <Input placeholder="Email" type="email" />
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
                          placeholder="Confirm Password"
                          type="password"
                          autoComplete="off"
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      <Button
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

export default Register;
