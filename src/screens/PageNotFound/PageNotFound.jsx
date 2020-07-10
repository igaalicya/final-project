import React from "react";
import "./PageNotFound.css";

class PageNotFound extends React.Component {
  render() {
    return (
      <div className="container container-404">
        <h1 className="text-404">404</h1>
        <h2 className="text-404">Oops! Page Not Found!</h2>
      </div>
    );
  }
}

export default PageNotFound;
