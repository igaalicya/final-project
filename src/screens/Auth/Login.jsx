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

class Login extends React.Component {
  render() {
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
                  <Form>
                    <Input placeholder="Email" type="email" />
                    <Input
                      className="mt-2"
                      placeholder="Password"
                      type="password"
                    />
                    <div className="text-center">
                      <Button
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
                          Remember Me
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

export default Login;
