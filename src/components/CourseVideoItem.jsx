import { AccordionButton } from "@chakra-ui/accordion";
import { AccordionIcon } from "@chakra-ui/accordion";
import { AccordionPanel } from "@chakra-ui/accordion";
import { AccordionItem } from "@chakra-ui/accordion";
import Icon from "@chakra-ui/icon";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";

import {
  deleteCourseVideo,
  openCourseModel,
  setSelectedVideo,
} from "../redux/actions/course";
import { USER_ROLE } from "../redux/constants";
import DeleteConfirm from "./DeleteConfirm";

import VideoPlayer from "./VideoPlayer";

export function CourseVideoItem({ role, courseVideo, dispatch }) {
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const onEdit = () => {
    dispatch(setSelectedVideo(courseVideo));
    dispatch(openCourseModel());
  };

  const onDeleteClick = () => {
    setDeleteOpen(true);
  };

  const onDeleteCancel = () => {
    setDeleteOpen(false);
  };

  const onDelete = () => {
    dispatch(deleteCourseVideo(courseVideo.id));
  };

  return (
    <AccordionItem key={courseVideo.id}>
      <DeleteConfirm
        isOpen={isDeleteOpen}
        onCancel={onDeleteCancel}
        onDelete={onDelete}
      />
      <Flex alignItems="center">
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {courseVideo.name}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        {role === USER_ROLE.TUTOR && (
          <Flex>
            <Icon as={MdEdit} onClick={onEdit} />{" "}
            <Icon as={MdDelete} onClick={onDeleteClick} />
          </Flex>
        )}
      </Flex>
      <AccordionPanel pb={4}>
        <Box>
          <VideoPlayer
            style={{ width: "100%" }}
            videoUrl={courseVideo.videoUrl}
          />
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default CourseVideoItem;
