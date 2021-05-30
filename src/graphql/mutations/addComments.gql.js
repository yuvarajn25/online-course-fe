import gql from "graphql-tag";

const addComments = gql`
  mutation addComments($comment: String, $parentId: String) {
    addComments(comment: $comment, parentId: $parentId) {
      id
      parentId
      comment
      createdBy
    }
  }
`;
export default addComments;
