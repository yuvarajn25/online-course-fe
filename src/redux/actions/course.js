import { pick } from "lodash";
import addComments from "../../graphql/mutations/addComments.gql";
import createCourse from "../../graphql/mutations/createCourse.gql";
import createCourseVideo from "../../graphql/mutations/createCourseVideo.gql";
import deleteCourseVideoGQL from "../../graphql/mutations/deleteCourseVideo.gql";
import deleteCourseGQL from "../../graphql/mutations/deleteCourse.gql";
import getCoursesById from "../../graphql/queries/getCourseById.gql";
import getCoursesQuery from "../../graphql/queries/getCourses.gql";
import getCoursesByAuthor from "../../graphql/queries/getCoursesByAuthor.gql";
import { execGQL } from "../../helpers/graphql-client";
import {
  CLOSE_COURSE_MODEL,
  OPEN_COURSE_MODEL,
  SET_COURSES,
  SET_FETCH_STATUS,
  SET_SELECTED_COURSE,
  USER_ROLE,
  SET_SELECTED_VIDEO,
} from "../constants";
import { setLoader } from "./loader";

export function openCourseModel() {
  return { type: OPEN_COURSE_MODEL };
}

export function cancelCourseModel() {
  return async (dispatch, getState) => {
    dispatch({ type: CLOSE_COURSE_MODEL });
    dispatch({ type: SET_SELECTED_COURSE, selectedCourse: {} });
  };
}

export function cancelCourseVideoModel() {
  return async (dispatch, getState) => {
    dispatch({ type: CLOSE_COURSE_MODEL });
    dispatch({ type: SET_SELECTED_VIDEO, selectedVideo: {} });
  };
}

export function setSelectedCourse(course) {
  return { type: SET_SELECTED_COURSE, selectedCourse: course };
}

export function setSelectedVideo(video) {
  return { type: SET_SELECTED_VIDEO, selectedVideo: video };
}

export function postCourse(course) {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      dispatch({ type: CLOSE_COURSE_MODEL });
      dispatch(setLoader(true));
      const result = await execGQL(createCourse, {
        course: pick(course, ["id", "name", "description"]),
      });
      const { courses } = state.course;
      const createdCourse = result.data.createCourse;
      const updatedIndex = courses.findIndex((c) => c.id === createdCourse.id);
      if (updatedIndex > -1) courses[updatedIndex] = createdCourse;
      else courses.push(createdCourse);
      dispatch({
        type: SET_COURSES,
        courses: courses,
      });
      dispatch({ type: SET_SELECTED_COURSE, selectedCourse: {} });
      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
      throw error;
    }
  };
}

export function postCourseVideo(courseVideo) {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      dispatch({ type: CLOSE_COURSE_MODEL });
      dispatch(setLoader(true));
      const { selectedCourse } = state.course;
      const result = await execGQL(createCourseVideo, {
        courseVideo: {
          ...pick(courseVideo, ["id", "name", "description", "videoUrl"]),
          courseId: selectedCourse.id,
        },
      });
      const createdCourseVideo = result.data.createCourseVideo;
      const updatedIndex = (selectedCourse.courseVideos || []).findIndex(
        (c) => c.id === createdCourseVideo.id
      );
      if (updatedIndex > -1)
        selectedCourse.courseVideos[updatedIndex] = createdCourseVideo;
      else selectedCourse.courseVideos.push(createdCourseVideo);
      dispatch({
        type: SET_SELECTED_COURSE,
        selectedCourse,
      });
      dispatch({ type: SET_SELECTED_VIDEO, selectedVideo: {} });
      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
      throw error;
    }
  };
}

export function getCourses() {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      dispatch(setLoader(true));
      const { role } = state.user;
      if (role === USER_ROLE.TUTOR) {
        const result = await execGQL(getCoursesByAuthor, {
          id: state.user.id,
        });
        console.log(result);
        dispatch({
          type: SET_COURSES,
          courses: result.data.getCoursesByAuthor,
        });
      } else {
        const result = await execGQL(getCoursesQuery, {});
        dispatch({
          type: SET_COURSES,
          courses: result.data.getCourses,
        });
      }
      dispatch({ type: SET_FETCH_STATUS, isFetched: true });
      dispatch(setLoader(false));
    } catch (error) {
      dispatch({ type: SET_FETCH_STATUS, isFetched: true });
      dispatch(setLoader(false));
      throw error;
    }
  };
}

export function getCourseById(id) {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoader(true));
      const result = await execGQL(getCoursesById, {
        id,
      });
      dispatch({
        type: SET_SELECTED_COURSE,
        selectedCourse: result.data.getCoursesById,
      });
      dispatch({ type: SET_FETCH_STATUS, isFetched: true });
      dispatch(setLoader(false));
    } catch (error) {
      dispatch({ type: SET_FETCH_STATUS, isFetched: true });
      dispatch(setLoader(false));
      throw error;
    }
  };
}

export function postComment(parentId, comment) {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoader(true));
      const state = getState();
      const {
        course: { selectedCourse },
      } = state;
      const result = await execGQL(addComments, {
        parentId,
        comment,
      });

      if (selectedCourse.id === parentId) {
        selectedCourse.comments.push(result.data.addComments);
      } else {
        const commentIndex = selectedCourse.comments.findIndex(
          (c) => c.id === parentId
        );
        selectedCourse.comments[commentIndex] = {
          ...selectedCourse.comments[commentIndex],
          comments: [result.data.addComments],
        };
      }

      dispatch({ type: SET_SELECTED_COURSE, selectedCourse });
      dispatch({ type: SET_FETCH_STATUS, isFetched: true });
      dispatch(setLoader(false));
    } catch (error) {
      dispatch({ type: SET_FETCH_STATUS, isFetched: true });
      dispatch(setLoader(false));
      throw error;
    }
  };
}

export function deleteCourseVideo(courseVideoId) {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      dispatch({ type: CLOSE_COURSE_MODEL });
      dispatch(setLoader(true));
      const { selectedCourse } = state.course;
      await execGQL(deleteCourseVideoGQL, {
        id: courseVideoId,
      });

      selectedCourse.courseVideos = selectedCourse.courseVideos.filter(
        (c) => c.id !== courseVideoId
      );

      dispatch({
        type: SET_SELECTED_COURSE,
        selectedCourse,
      });
      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
      throw error;
    }
  };
}

export function deleteCourse(courseId) {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      dispatch({ type: CLOSE_COURSE_MODEL });
      dispatch(setLoader(true));
      const { courses } = state.course;
      await execGQL(deleteCourseGQL, {
        id: courseId,
      });

      dispatch({
        type: SET_COURSES,
        courses: courses.filter((c) => c.id !== courseId),
      });

      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
      throw error;
    }
  };
}
