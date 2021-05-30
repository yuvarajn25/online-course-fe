import getUserById from "../../graphql/queries/getUserById.gql";
import subscribeCourseMutation from "../../graphql/mutations/subscribeCourse.gql";
import { getCurrentUserInfo } from "../../helpers/authentication";
import { execGQL } from "../../helpers/graphql-client";
import { SET_USER } from "../constants";
import { setLoader } from "./loader";

export function setUser(user) {
  return { type: SET_USER, user };
}

export const checkCurrentUser = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoader(true));
      const { user } = getState();
      const userInfo = await getCurrentUserInfo();
      console.log({ userInfo, user });
      if (!userInfo) return;
      if (!user || user.id !== userInfo.username) {
        console.log(userInfo.username);
        const result = await execGQL(getUserById, {
          id: userInfo.username,
        });
        console.log({ result });
        dispatch(setUser(result.data.getUserById));
      }
      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
      throw error;
    }
  };
};

export const subscribeCourse = (courseId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoader(true));
      const { user } = getState();

      const result = await execGQL(subscribeCourseMutation, {
        courseId,
      });
      user.courseSubscriptions.push(result.data.subscribeCourse);
      dispatch(setUser(user));
      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
      throw error;
    }
  };
};
