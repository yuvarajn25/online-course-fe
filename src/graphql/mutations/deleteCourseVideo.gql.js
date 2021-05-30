import gql from "graphql-tag";

const deleteCourseVideo = gql`
  mutation deleteCourseVideo($id: String!) {
    deleteCourseVideo(id: $id) {
      id
      entityType
    }
  }
`;
export default deleteCourseVideo;
