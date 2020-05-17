import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Redux imports
import { Provider } from "react-redux";
import reducers from "./redux/reducers";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
