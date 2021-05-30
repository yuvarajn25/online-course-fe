import gql from "graphql-tag";

const getCoursesByAuthor = gql`
  query getCoursesByAuthor($id: String) {
    getCoursesByAuthor(id: $id, entityType: "Course") {
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
export default getCoursesByAuthor;
