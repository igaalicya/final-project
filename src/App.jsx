import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
// import logo from "./logo.svg";
import Cookie from "universal-cookie";
import { connect } from "react-redux";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { userKeepLogin, cookieChecker } from "./redux/actions";
import ClipLoader from "react-spinners/ClipLoader";

// import Navbar from "./components/Navbar/Navbar";
import MyNavbar from "./components/Navbar/Navbar";
import MyFooter from "./components/Footer/Footer";
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
import History from "./screens/History/History";
import ChangePassword from "./screens/ChangePassword/ChangePassword";
import ArticleDetails from "./screens/ArticleDetails/ArticleDetails";
import Wishlist from "./screens/Wishlist/Wishlist";
import AdminPayment from "./screens/Admin/AdminPayment";
import ForgetPassword from "./screens/ForgetPassword/ForgetPassword";
import ResetPassword from "./screens/ForgetPassword/ResetPassword";
import AdminCategories from "./screens/Admin/AdminCategories";
import AdminPackage from "./screens/Admin/AdminPackage";
import AdminReport from "./screens/Admin/AdminReport";

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
          <Route exact path="/admin/members" component={AdminMembers} />
          <Route exact path="/admin/doctors" component={AdminDoctors} />
          <Route exact path="/admin/vaccine" component={AdminVaccine} />
          <Route exact path="/admin/transaction" component={AdminPayment} />
          <Route exact path="/admin/categories" component={AdminCategories} />
          <Route exact path="/admin/package" component={AdminPackage} />
          <Route exact path="/admin/report" component={AdminReport} />
        </>
      );
    }
  };

  renderProtectedRoutes = () => {
    if (this.props.user.id) {
      return (
        <>
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/wishlist" component={Wishlist} />
          <Route exact path="/profileUser" component={ProfileUser} />
          <Route exact path="/transaction" component={History} />
          <Route exact path="/changePassword" component={ChangePassword} />
        </>
      );
    }
  };

  render() {
    if (this.props.user.cookieChecked) {
      return (
        <>
          <MyNavbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgetPassword" component={ForgetPassword} />
            <Route
              exact
              path="/resetPassword/:userId/:token"
              component={ResetPassword}
            />
            <Route
              exact
              path="/profileDoctor/:doctorId"
              component={ProfileDoctor}
            />
            <Route exact path="/doctors" component={Doctors} />
            <Route exact path="/vaccine" component={Vaccine} />
            <Route
              exact
              path="/vaccineDetails/:vaccineId"
              component={VaccineDetails}
            />
            <Route
              exact
              path="/article/:articleId"
              component={ArticleDetails}
            />
            <Route exact path="/test" component={Test} />
            {this.renderAdminRoutes()}
            {this.renderProtectedRoutes()}
            <Route path="*" component={PageNotFound} />
            {/* <Route exact path="*" component={PageNotFound} /> */}
          </Switch>
          <MyFooter />
        </>
      );
    } else {
      return (
        <div
          style={{ paddingTop: "260px", paddingLeft: "600px" }}
          className="justify-content-center"
        >
          <ClipLoader size={100} color={"#123abc"} />
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
  keepLogin: userKeepLogin,
  cookieChecker,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
