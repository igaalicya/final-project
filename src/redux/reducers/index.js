import { combineReducers } from "redux";
import userReducer from "./user";
import cartReducer from "./cart";
import searchReducer from "./search";

export default combineReducers({
  user: userReducer,
  cart: cartReducer,
  search: searchReducer,
});
