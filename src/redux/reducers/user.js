import { SET_USER } from "../constants";

export default function (state = null, action) {
  switch (action.type) {
    case SET_USER: {
      return action.user;
    }
    default:
      return state;
  }
}
