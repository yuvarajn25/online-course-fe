import { AccordionItem } from "@chakra-ui/accordion";
import { AccordionIcon } from "@chakra-ui/accordion";
import { AccordionPanel } from "@chakra-ui/accordion";
import { AccordionButton } from "@chakra-ui/accordion";
import { Accordion } from "@chakra-ui/accordion";
import { Box } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { getCourseById, openCourseModel } from "../redux/actions/course";
import "video-react/dist/video-react.css";
import { USER_ROLE } from "../redux/constants";
import { Button } from "@chakra-ui/button";
import CourseVideoModel from "../components/CourseVideoModel";
import CourseVideoItem from "../components/CourseVideoItem";
import CommentsWindow from "../components/CommentsWindow";
import { IoIosArrowBack } from "react-icons/io";
import Icon from "@chakra-ui/icon";
import { Link } from "@chakra-ui/layout";
import { Link as RouteLink } from "react-router-dom";
import { HOME } from "../routes";
import { useToast } from "@chakra-ui/toast";
import { subscribeCourse } from "../redux/actions/user";

function CourseView({ user, course: { selectedCourse }, dispatch }) {
  const toast = useToast();

  const [role, setRole] = useState();
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isSubscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setRole(user.role);
    setSubscribed(
      !!user.courseSubscriptions.find((s) => s.courseId === selectedCourse.id)
    );
  }, [role]);
  const onAdd = (event) => {
    dispatch(openCourseModel());
  };

  const onVideoView = (index) => {
    if (role === USER_ROLE.STUDENT && !isSubscribed) {
      toast({
        title: `Subscribe to view the content`,
        position: "top",
        status: "error",
        isClosable: true,
      });
      return;
    }
    setCurrentIndex(index);
  };

  const onSubscribe = () => {
    dispatch(subscribeCourse(selectedCourse.id));
  };

  return (
    <div>
      <CourseVideoModel />
      <Flex padding="50px" height="70vh" direction="column">
        <Text textDecoration="underline">
          <Link as={RouteLink} to={HOME}>
            <Icon as={IoIosArrowBack} />
            Back To Courses
          </Link>
        </Text>
        <Heading mt={3}>{selectedCourse.name}</Heading>
        <Text>{selectedCourse.description}</Text>
        {role === USER_ROLE.TUTOR && (
          <Button mt="5vh" colorScheme="linkedin" width="150px" onClick={onAdd}>
            Add Video
          </Button>
        )}

        {role === USER_ROLE.STUDENT && (
          <Button
            mt="5vh"
            colorScheme="linkedin"
            width="150px"
            onClick={onSubscribe}
            disabled={isSubscribed}
          >
            {isSubscribed ? `Subscribed` : `Subscribe`}
          </Button>
        )}
        <Flex mt="6vh" height="100%">
          <Accordion
            width="50%"
            allowToggle
            index={currentIndex}
            onChange={onVideoView}
            overflow="auto"
          >
            {(selectedCourse.courseVideos || []).map((video) => {
              return (
                <CourseVideoItem
                  courseVideo={video}
                  dispatch={dispatch}
                  role={role}
                />
              );
            })}
          </Accordion>
          <Box width="50%" padding="10px">
            <CommentsWindow />
          </Box>
        </Flex>
      </Flex>
    </div>
  );
}
const mapStateToProps = (state, props) => {
  return { ...state, ...props };
};
export default connect(mapStateToProps)(CourseView);
