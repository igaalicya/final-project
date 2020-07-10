import React from "react";
import { connect } from "react-redux";
import { Alert } from "reactstrap";
// import { Redirect } from "react-router-dom";
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
import { forgetPasswordHandler } from "../../redux/actions";

class ForgetPassword extends React.Component {
  state = {
    email: "",
  };

  inputHandler = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  resetPassHandler = () => {
    console.log(this.state.email);
    this.props.onforgetPassword(this.state.email);
  };

  forgetBtnHandler = () => {
    Axios.post(`${API_URL}/users/forgetpassword`, {
      email: this.state.email,
    })
      .then((res) => {
        console.log(res.data);

        swal(
          "Please Check your Email",
          "Forget Password Link Has Been Sent to Your Email",
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
        swal("Gagal", "password gagal diubah", "error");
      });
  };

  //   componentDidMount() {
  //     this.getOldPassword();
  //   }

  render() {
    // const { password, newPassword } = this.state.editForm;
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
                      value={this.state.email}
                      onChange={(e) => this.inputHandler(e, "email")}
                      placeholder="Your email address"
                      type="text"
                    />
                    <div className="text-center">
                      <Button
                        onClick={this.forgetBtnHandler}
                        className="my-4"
                        color="primary"
                        type="button"
                        block
                      >
                        SEND EMAIL
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
  onForgetPassword: forgetPasswordHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
