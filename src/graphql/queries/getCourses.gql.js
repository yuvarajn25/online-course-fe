import gql from "graphql-tag";

const getCourses = gql`
  query getCourses {
    getCourses(entityType: "Course") {
      id
      name
      description
      createdBy
      createdDate
      lastUpdatedBy
      lastUpdatedDate
    }
  }
`;
export default getCourses;
