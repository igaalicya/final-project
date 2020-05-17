import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
// import logo from "./logo.svg";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

// import Navbar from "./components/Navbar/Navbar";
import MyNavbar from "./components/Navbar/Navbar";
import Home from "./screens/Home/Home";
import PageNotFound from "./screens/PageNotFound/PageNotFound";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/Register";
import ProfileDoctor from "./screens/Profile/ProfileDoctor";

function App() {
  return (
    <>
      <MyNavbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/profileDoctor" component={ProfileDoctor} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </>
  );
}

export default withRouter(App);
