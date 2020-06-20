import { combineReducers } from "redux";
import search from "./search";
import user from "./user";

export default combineReducers({ search, user });