import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
// import logo from "./logo.svg";
import Cookie from "universal-cookie";
import { connect } from "react-redux";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { userKeepLogin, cookieChecker } from "./redux/actions";

// import Navbar from "./components/Navbar/Navbar";
import MyNavbar from "./components/Navbar/Navbar";
import Home from "./screens/Home/Home";
import PageNotFound from "./screens/PageNotFound/PageNotFound";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/Register";
import ProfileDoctor from "./screens/Profile/ProfileDoctor";
import About from "./screens/About/About";
import Doctors from "./screens/Doctors/Doctors";
import Test from "./screens/test";
import AdminMembers from "./screens/Admin/AdminMembers";
import AdminDoctors from "./screens/Admin/AdminDoctors";
import AdminVaccine from "./screens/Admin/AdminVaccine";
import Vaccine from "./screens/Vaccine/Vaccine";
import VaccineDetails from "./screens/VaccineDetails/VaccineDetails";
import Cart from "./screens/Cart/Cart";
import ProfileUser from "./screens/Profile/ProfileUser";
// import ChangePassword from "./screens/ChangePassword/ChangePassword";

const cookieObj = new Cookie();

class App extends React.Component {
  componentDidMount() {
    let cookieResult = cookieObj.get("authData", { path: "/" });
    if (cookieResult) {
      this.props.keepLogin(cookieResult);
    } else {
      this.props.cookieChecker();
    }
  }

  renderAdminRoutes = () => {
    if (this.props.user.role === "admin") {
      return (
        <>
          <Route path="/admin/members" component={AdminMembers} />
          <Route path="/admin/doctors" component={AdminDoctors} />
          <Route path="/admin/vaccine" component={AdminVaccine} />
        </>
      );
    }
  };

  renderProtectedRoutes = () => {
    if (this.props.user.id) {
      return (
        <>
          <Route path="/cart" component={Cart} />
          <Route path="/profileUser" component={ProfileUser} />
          {/* <Route path="/changePassword" component={ChangePassword} /> */}
        </>
      );
    }
  };

  render() {
    return (
      <>
        <MyNavbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profileDoctor/:doctorId" component={ProfileDoctor} />
          <Route path="/doctors" component={Doctors} />
          <Route path="/vaccine" component={Vaccine} />
          <Route path="/vaccineDetails/:vaccineId" component={VaccineDetails} />
          <Route path="/test" component={Test} />
          {this.renderAdminRoutes()}
          {this.renderProtectedRoutes()}
          <Route path="*" component={PageNotFound} />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  keepLogin: userKeepLogin,
  cookieChecker,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
