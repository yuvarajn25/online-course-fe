import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  cancelCourseVideoModel,
  postCourseVideo,
} from "../redux/actions/course";
import { v4 as uuid } from "uuid";
import { getFile, uploadFile } from "../helpers/stroage";
import { Progress } from "@chakra-ui/progress";
import VideoPlayer from "./VideoPlayer";

function CourseVideoModel({
  course: { selectedCourse, selectedVideo, isCourseModelOpen },
  dispatch,
}) {
  const [courseVideo, setCourseVideo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const toast = useToast();

  useEffect(() => setCourseVideo(selectedVideo), [selectedVideo]);

  const onChange = (field) => (event) => {
    setCourseVideo({ ...courseVideo, [field]: event.target.value });
  };

  const uploadProgress = (progress) => {
    setProgress((progress.loaded / progress.total) * 100);
  };

  const onFilePick = async (event) => {
    if (event.target.files && event.target.files[0]) {
      setIsUploading(true);
      const file = event.target.files[0];
      const ext = file.name.split(".").pop();
      const id = courseVideo.id || uuid();
      const res = await uploadFile(
        `${selectedCourse.id}/${id}.${ext}`,
        file,
        uploadProgress
      );
      setCourseVideo({ ...courseVideo, videoUrl: res.key, id });
      setIsUploading(false);
    }
  };

  const onCancel = (event) => {
    dispatch(cancelCourseVideoModel());
  };

  const onSave = (event) => {
    try {
      dispatch(postCourseVideo(courseVideo));
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
            {selectedVideo.id ? `Edit Video` : `New Video`}
          </ModalHeader>

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Name"
                name="name"
                onChange={onChange("name")}
                value={courseVideo?.name}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                placeholder="Description"
                name="description"
                onChange={onChange("description")}
                value={courseVideo?.description}
              />
            </FormControl>
          </ModalBody>
          {courseVideo?.videoUrl ? (
            // <div>courseVideo?.videoUrl</div>
            <VideoPlayer videoUrl={courseVideo?.videoUrl} />
          ) : (
            <Input onChange={onFilePick} type="file" accept="video/*" />
          )}
          {isUploading && <Progress hasStripe value={progress} />}
          <ModalFooter>
            <Button
              disabled={isUploading}
              colorScheme="linkedin"
              mr={3}
              onClick={onSave}
            >
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
export default connect(mapStateToProps)(CourseVideoModel);
