import Axios from "axios";
import { API_URL } from "../../constants/API";
import Cookie from "universal-cookie";
import swal from "sweetalert";
import userTypes from "../types/user";

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT_SUCCESS } = userTypes;

const cookieObj = new Cookie();

export const loginHandler = (userData) => {
  return (dispatch) => {
    const { username, password } = userData;

    Axios.get(`${API_URL}/users`, {
      params: {
        username,
        password,
      },
    })
      .then((res) => {
        console.log(res.data);
        if (Object.keys(res.data).length > 0) {
          dispatch({
            type: ON_LOGIN_SUCCESS,
            payload: res.data,
          });
          swal("Berhasil", "Login berhasil", "success");
          Axios.get(`${API_URL}/carts`, {
            params: {
              userId: res.data.id,
            },
          })
            .then((res) => {
              dispatch({
                type: "FILL_CART",
                payload: Object.keys(res.data).length,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          dispatch({
            type: ON_LOGIN_FAIL,
            payload: "Username atau password salah",
          });
          swal("Gagal", "Username atau password salah", "error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// export const userKeepLogin = (userData) => {
//   return (dispatch) => {
//     Axios.get(`${API_URL}/users/${userData.id}`)
//       .then((res) => {
//         console.log(res.data);
//         if (res.data.length > 0) {
//           dispatch({
//             type: ON_LOGIN_SUCCESS,
//             payload: res.data[0],
//           });
//           Axios.get(`${API_URL}/carts`, {
//             params: {
//               userId: res.data[0].id,
//             },
//           })
//             .then((res) => {
//               dispatch({
//                 type: "FILL_CART",
//                 payload: res.data.length,
//               });
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         } else {
//           dispatch({
//             type: ON_LOGIN_FAIL,
//             payload: "Username atau password salah",
//           });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

export const userKeepLogin = (userData) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users/id`, {
      params: {
        id: userData.id,
      },
    })
      .then((res) => {
        console.log(res.data);
        if (Object.keys(res.data).length > 0) {
          dispatch({
            type: ON_LOGIN_SUCCESS,
            payload: res.data,
          });
          Axios.get(`${API_URL}/carts`, {
            params: {
              userId: res.data.id,
            },
          })
            .then((res) => {
              dispatch({
                type: "FILL_CART",
                payload: Object.keys(res.data).length,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          dispatch({
            type: ON_LOGIN_FAIL,
            payload: "Username atau password salah",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const logoutHandler = () => {
  cookieObj.remove("authData", { path: "/" });
  return {
    type: ON_LOGOUT_SUCCESS,
  };
};

export const registerHandler = (userData) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users/username`, {
      params: {
        username: userData.username,
      },
    })
      .then((res) => {
        if (Object.keys(res.data).length > 0) {
          dispatch({
            type: "ON_REGISTER_FAIL",
            payload: "username sudah digunakan",
          });
          swal("Gagal", "Username sudah digunakan", "error");
        } else {
          Axios.get(`${API_URL}/users/email`, {
            params: {
              email: userData.email,
            },
          }).then((res) => {
            if (Object.keys(res.data).length > 0) {
              dispatch({
                type: "ON_REGISTER_FAIL",
                payload: "email sudah digunakan",
              });
              swal("Gagal", "Email sudah digunakan", "error");
            } else {
              Axios.post(`${API_URL}/users`, {
                ...userData,
                role: "user",
                isVerified: 0,
              })
                .then((res) => {
                  console.log(res.data);
                  dispatch({
                    type: ON_LOGIN_SUCCESS,
                    payload: res.data,
                  });
                  swal("Berhasil", "Registrasi akun berhasil", "success");
                  Axios.get(`${API_URL}/carts`, {
                    params: {
                      userId: res.data.id,
                    },
                  })
                    .then((res) => {
                      dispatch({
                        type: "FILL_CART",
                        payload: Object.keys(res.data).length,
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const cookieChecker = () => {
  return {
    type: "COOKIE_CHECK",
  };
};

export const fillCart = (userId) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId,
      },
    })
      .then((res) => {
        dispatch({
          type: "FILL_CART",
          payload: Object.keys(res.data).length,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const changePasswordHandler = (passwordData) => {
  const { id, newPassword } = passwordData;
  return (dispatch) => {
    Axios.patch(`${API_URL}/users/${id}`, {
      password: newPassword,
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: ON_LOGIN_SUCCESS,
          payload: res.data,
        });
        swal("Berhasil", "Password berhasil diubah", "success");
      })
      .catch((err) => {
        console.log(err);
        swal("Gagal", "password gagal diubah", "error");
      });
  };
};

export const forgetPasswordHandler = (email) => {
  return (dispatch) => {
    Axios.post(`${API_URL}/users/`, {
      email,
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: ON_LOGIN_SUCCESS,
          payload: res.data,
        });
        swal("Berhasil", "Password berhasil diubah", "success");
      })
      .catch((err) => {
        console.log(err);
        swal("Gagal", "password gagal diubah", "error");
      });
  };
};
