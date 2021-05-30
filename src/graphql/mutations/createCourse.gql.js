import gql from "graphql-tag";

const createCourse = gql`
  mutation createCourse($course: CourseInput!) {
    createCourse(course: $course) {
      id
      name
      lastUpdatedBy
      lastUpdatedDate
      entityType
      description
      createdDate
      createdBy
    }
  }
`;
export default createCourse;
