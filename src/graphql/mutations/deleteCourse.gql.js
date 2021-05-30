import gql from "graphql-tag";

const deleteCourse = gql`
  mutation deleteCourse($id: String!) {
    deleteCourse(id: $id) {
      id
      entityType
    }
  }
`;
export default deleteCourse;
