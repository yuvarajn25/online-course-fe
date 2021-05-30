import Icon from "@chakra-ui/icon";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useHistory } from "react-router";

import {
  deleteCourse,
  getCourseById,
  openCourseModel,
  setSelectedCourse,
} from "../redux/actions/course";
import { SET_FETCH_STATUS, USER_ROLE } from "../redux/constants";
import { COURSE } from "../routes";
import DeleteConfirm from "./DeleteConfirm";

export function CourseItem({ role, course, dispatch, isSubscribed }) {
  const history = useHistory();
  const onEdit = () => {
    dispatch(setSelectedCourse(course));
    dispatch(openCourseModel());
  };

  const onCourseClick = () => {
    dispatch(getCourseById(course.id));
    history.push(`${COURSE}/${course.id}`);
  };

  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const onDeleteClick = () => {
    setDeleteOpen(true);
  };

  const onDeleteCancel = () => {
    setDeleteOpen(false);
  };

  const onDelete = () => {
    dispatch(deleteCourse(course.id));
  };

  return (
    <Box
      w="300px"
      height={"100px"}
      padding={"15px"}
      borderRadius={"15px"}
      bg="blue.100"
    >
      <DeleteConfirm
        isOpen={isDeleteOpen}
        onCancel={onDeleteCancel}
        onDelete={onDelete}
      />
      {role === USER_ROLE.TUTOR && (
        <Flex
          justifyContent="flex-end"
          alignItems="flex-end"
          width={"auto"}
          style={{
            position: "relative",
            right: "0px",
          }}
        >
          <Icon cursor="pointer" marginRight="2" as={MdEdit} onClick={onEdit} />
          <Icon cursor="pointer" as={MdDelete} onClick={onDeleteClick} />
        </Flex>
      )}
      <Box cursor="pointer" onClick={onCourseClick}>
        <Text fontWeight="bold">{course.name}</Text>
        <Text fontSize="0.9em">{course.description}</Text>
        {role === USER_ROLE.STUDENT && isSubscribed && (
          <Text color="red.300" fontWeight={"bold"}>
            Subscribed
          </Text>
        )}
      </Box>
    </Box>
  );
}

export default CourseItem;
