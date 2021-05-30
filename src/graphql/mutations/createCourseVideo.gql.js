import gql from "graphql-tag";

const createCourseVideo = gql`
  mutation createCourseVideo($courseVideo: CourseVideoInput!) {
    createCourseVideo(courseVideo: $courseVideo) {
      id
      name
      description
      videoUrl
    }
  }
`;
export default createCourseVideo;
