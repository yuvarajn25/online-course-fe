import gql from "graphql-tag";

const getUserById = gql`
  query getUserById($id: String) {
    getUserById(id: $id, entityType: "User") {
      id
      name
      role
      courseSubscriptions(entityType: "CourseSubscription") {
        id
        courseId
      }
    }
  }
`;
export default getUserById;
