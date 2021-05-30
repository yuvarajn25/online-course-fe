import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import { connect } from "react-redux";
import { postComment } from "../redux/actions/course";
import { USER_ROLE } from "../redux/constants";

function Comment({ user, comment, dispatch }) {
  const [isReply, setIsReply] = useState(false);

  const [commentText, setCommentText] = useState("");

  const onSend = () => dispatch(postComment(comment.id, commentText));

  const replyBox = () => {
    return isReply ? (
      <Flex direction="column">
        <Input
          type="text"
          width="80%"
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
        ></Input>
        <Flex>
          <Button
            onClick={onSend}
            margin="5px"
            size="sm"
            colorScheme="linkedin"
          >
            Save
          </Button>
          <Button
            onClick={() => setIsReply(false)}
            margin="5px"
            size="sm"
            colorScheme="red"
          >
            Cancel
          </Button>
        </Flex>
      </Flex>
    ) : (
      <Text
        onClick={() => setIsReply(true)}
        color="blue.600"
        ml="4"
        cursor="pointer"
      >
        reply
      </Text>
    );
  };
  return (
    <Box padding="5px 0px">
      <Text fontWeight="bold">{comment.createdBy}</Text>
      {comment.comment}
      {(comment.comments || []).map((c2) => (
        <Text ml="4" fontStyle="italic">
          {" "}
          - {c2.comment}
        </Text>
      ))}
      {user.role === USER_ROLE.TUTOR && replyBox()}
    </Box>
  );
}
const mapStateToProps = (state, props) => {
  return { ...state, ...props };
};
export default connect(mapStateToProps)(Comment);
