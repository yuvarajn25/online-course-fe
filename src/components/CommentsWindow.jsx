import Icon from "@chakra-ui/icon";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import { connect } from "react-redux";
import { FiSend } from "react-icons/fi";
import Comment from "./Comment";
import { postComment } from "../redux/actions/course";

function CommentsWindow({ course: { selectedCourse }, dispatch }) {
  const [commentText, setCommentText] = useState("");

  const onSend = () => dispatch(postComment(selectedCourse.id, commentText));
  return (
    <Flex direction="column" justifyContent="flex-end" height="100%">
      <Box overflow="auto" marginBottom={5}>
        {(selectedCourse.comments || []).map((comment) => (
          <Comment comment={comment} />
        ))}
      </Box>
      <Flex alignItems="center">
        <Input
          type="text"
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
        />
        <Icon onClick={onSend} padding="5px" fontSize="2em" as={FiSend} />
      </Flex>
    </Flex>
  );
}

const mapStateToProps = (state, props) => {
  return { ...state, ...props };
};
export default connect(mapStateToProps)(CommentsWindow);
