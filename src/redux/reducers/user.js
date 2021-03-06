import userTypes from "../types/user";

const {
  ON_LOGIN_SUCCESS,
  ON_LOGIN_FAIL,
  ON_LOGOUT_SUCCESS,
  ON_REGISTER_FAIL,
} = userTypes;

const init_state = {
  id: 0,
  username: "",
  fullName: "",
  email: "",
  role: "",
  verified: false,
  errMsg: "",
  cookieChecked: false,
};

export default (state = init_state, action) => {
  switch (action.type) {
    case ON_LOGIN_SUCCESS:
      const { username, fullName, email, role, id, verified } = action.payload;
      return {
        ...state,
        username,
        fullName,
        email,
        role,
        verified,
        id,
        cookieChecked: true,
      };
    case ON_LOGIN_FAIL:
      return { ...state, errMsg: action.payload, cookieChecked: true };
    case ON_REGISTER_FAIL:
      return { ...state, errMsg: action.payload, cookieChecked: true };
    case ON_LOGOUT_SUCCESS:
      return { ...init_state, cookieChecked: true };
    case "COOKIE_CHECK":
      return { ...state, cookieChecked: true };
    case "FILL_CART":
      return { ...state, cartItems: action.payload };
    case "LOADING":
      return { ...state, cookieChecked: false };
    default:
      return { ...state };
  }
};
