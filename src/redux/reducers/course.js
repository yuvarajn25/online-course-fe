import {
  CLOSE_COURSE_MODEL,
  OPEN_COURSE_MODEL,
  SET_COURSES,
  SET_FETCH_STATUS,
  SET_SELECTED_COURSE,
  SET_SELECTED_VIDEO,
} from "../constants";

const initialState = {
  isFetched: false,
  selectedCourse: {},
  selectedVideo: {},
  courses: [],
  isCourseModelOpen: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_COURSES: {
      return { ...state, courses: action.courses };
    }
    case SET_SELECTED_COURSE: {
      return { ...state, selectedCourse: action.selectedCourse };
    }
    case OPEN_COURSE_MODEL: {
      return { ...state, isCourseModelOpen: true };
    }
    case CLOSE_COURSE_MODEL: {
      return { ...state, isCourseModelOpen: false };
    }
    case SET_FETCH_STATUS: {
      return { ...state, isFetched: action.isFetched };
    }
    case SET_SELECTED_VIDEO: {
      return { ...state, selectedVideo: action.selectedVideo };
    }
    default:
      return state;
  }
}
