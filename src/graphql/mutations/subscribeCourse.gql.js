import gql from "graphql-tag";

const subscribeCourse = gql`
  mutation subscribeCourse($courseId: String!) {
    subscribeCourse(courseId: $courseId) {
      id
      entityType
      userId
      courseId
    }
  }
`;
export default subscribeCourse;
