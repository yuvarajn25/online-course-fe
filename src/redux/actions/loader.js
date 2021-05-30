import { SET_LOADER } from "../constants";

export function setLoader(isLoading) {
  return { type: SET_LOADER, isLoading };
}
