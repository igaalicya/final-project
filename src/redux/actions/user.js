import Axios from "axios";
import { API_URL } from "../../constants/API";
import Cookie from "universal-cookie";
import swal from "sweetalert";
import userTypes from "../types/user";

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT_SUCCESS } = userTypes;

const cookieObj = new Cookie();

export const loginHandler = userData => {
  return dispatch => {
    const { username, password } = userData;

    Axios.get(`${API_URL}/users`, {
      params: {
        username,
        password
      }
    })
      .then(res => {
        if (res.data.length > 0) {
          dispatch({
            type: ON_LOGIN_SUCCESS,
            payload: res.data[0]
          });
          swal("Berhasil", "Login berhasil", "success");
        } else {
          dispatch({
            type: ON_LOGIN_FAIL,
            payload: "Username atau password salah"
          });
          swal("Gagal", "Username atau password salah", "error");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const userKeepLogin = userData => {
  return dispatch => {
    Axios.get(`${API_URL}/users`, {
      params: {
        id: userData.id
      }
    })
      .then(res => {
        if (res.data.length > 0) {
          dispatch({
            type: ON_LOGIN_SUCCESS,
            payload: res.data[0]
          });
        } else {
          dispatch({
            type: ON_LOGIN_FAIL,
            payload: "Username atau password salah"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const logoutHandler = () => {
  cookieObj.remove("authData", { path: "/" });
  return {
    type: ON_LOGOUT_SUCCESS
  };
};

export const registerHandler = userData => {
  return dispatch => {
    Axios.get(`${API_URL}/users`, {
      params: {
        username: userData.username
      }
    })
      .then(res => {
        if (res.data.length > 0) {
          dispatch({
            type: "ON_REGISTER_FAIL",
            payload: "username sudah digunakan"
          });
          swal("Gagal", "Username sudah digunakan", "error");
        } else {
          Axios.post(`${API_URL}/users`, { ...userData, role: "user" })
            .then(res => {
              console.log(res.data);
              dispatch({
                type: ON_LOGIN_SUCCESS,
                payload: res.data
              });
              swal("Berhasil", "Registrasi akun berhasil", "success");
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const cookieChecker = () => {
  return {
    type: "COOKIE_CHECK"
  };
};
