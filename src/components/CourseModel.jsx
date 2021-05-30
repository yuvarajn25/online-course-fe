import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { cancelCourseModel, postCourse } from "../redux/actions/course";

function CourseModel({
  course: { selectedCourse, isCourseModelOpen },
  dispatch,
}) {
  const [course, setCourse] = useState(null);
  const toast = useToast();

  useEffect(() => setCourse(selectedCourse), [selectedCourse]);

  const onChange = (field) => (event) => {
    setCourse({ ...course, [field]: event.target.value });
  };

  const onCancel = (event) => {
    dispatch(cancelCourseModel());
  };

  const onSave = (event) => {
    try {
      dispatch(postCourse(course));
    } catch (error) {
      toast({
        title: error.message,
        position: "top",
        status: "error",
        isClosable: true,
      });
    }
  };
  return (
    <div>
      <Modal isOpen={isCourseModelOpen}>
        <ModalContent>
          <ModalHeader>
            {selectedCourse.id ? `Edit Course` : `New Course`}
          </ModalHeader>

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>name</FormLabel>
              <Input
                type="text"
                placeholder="Name"
                name="name"
                onChange={onChange("name")}
                value={course?.name}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                placeholder="Description"
                name="description"
                onChange={onChange("description")}
                value={course?.description}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="linkedin" mr={3} onClick={onSave}>
              Save
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state, props) => {
  return { ...state, ...props };
};
export default connect(mapStateToProps)(CourseModel);
