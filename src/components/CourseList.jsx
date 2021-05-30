import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { Button } from "@chakra-ui/button";
import { Box, Center, Flex, Grid } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCourses, openCourseModel } from "../redux/actions/course";
import { USER_ROLE } from "../redux/constants";
import { CourseItem } from "./CourseItem";
import CourseModel from "./CourseModel";

function CourseList({
  role,
  user: { courseSubscriptions = [] },
  course: { courses = [], isFetched },
  dispatch,
}) {
  useEffect(() => {
    if (!isFetched) dispatch(getCourses());
  }, [isFetched]);

  const onAdd = (event) => {
    dispatch(openCourseModel());
  };
  return (
    <div>
      <CourseModel />

      <Flex justifyContent="center" direction="column" mt="20vh" padding="50px">
        {role === USER_ROLE.TUTOR && (
          <Button colorScheme="linkedin" width="150px" onClick={onAdd}>
            Add New
          </Button>
        )}

        <Grid mt="5" width="90vw" templateColumns="repeat(5, 1fr)" gap={6}>
          {courses.map((course) => (
            <CourseItem
              key={course.id}
              role={role}
              isSubscribed={
                !!courseSubscriptions.find((s) => s.courseId === course.id)
              }
              course={course}
              dispatch={dispatch}
            />
          ))}
        </Grid>
      </Flex>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  return { ...state, ...props };
};
export default connect(mapStateToProps)(CourseList);
