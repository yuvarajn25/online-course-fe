import { combineReducers } from "redux";

import loader from "./loader";
import user from "./user";
import course from "./course";

export default combineReducers({ isLoading: loader, user, course });
