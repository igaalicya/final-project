import React from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Input,
  Row,
  Col
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
                  <Form>
                    <Input placeholder="Full Name" type="text" />
                    <Input
                      className="mt-2"
                      placeholder="Username"
                      type="text"
                    />
                    <Input className="mt-2" placeholder="Email" type="email" />
                    <Input
                      className="mt-2"
                      placeholder="Password"
                      type="password"
                      autoComplete="off"
                    />
                    <Input
                      className="mt-2"
                      placeholder="Confirm Password"
                      type="password"
                      autoComplete="off"
                    />
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
