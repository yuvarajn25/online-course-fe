import gql from "graphql-tag";

const getCoursesById = gql`
  query getCoursesById($id: String) {
    getCoursesById(id: $id, entityType: "Course") {
      id
      name
      description
      courseVideos(entityType: "CourseVideo") {
        id
        name
        description
        videoUrl
      }
      comments(entityType: "Comment") {
        id
        comment
        createdBy
        comments(entityType: "Comment") {
          id
          comment
          createdBy
        }
      }
    }
  }
`;
export default getCoursesById;
