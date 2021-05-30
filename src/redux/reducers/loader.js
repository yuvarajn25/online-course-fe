import { SET_LOADER } from "../constants";

export default function (state = false, action) {
  switch (action.type) {
    case SET_LOADER: {
      return action.isLoading;
    }
    default:
      return state;
  }
}
