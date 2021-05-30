import { Button } from "@chakra-ui/button";
import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogOverlay,
  AlertDialog,
  AlertDialogFooter,
} from "@chakra-ui/modal";

import React from "react";

export default function DeleteConfirm({ isOpen, onCancel, onDelete }) {
  return (
    <AlertDialog motionPreset="slideInBottom" isOpen={isOpen} isCentered>
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Are you want to Delete?</AlertDialogHeader>
        <AlertDialogBody>Are you sure Delete.</AlertDialogBody>
        <AlertDialogFooter>
          <Button onClick={onCancel}>No</Button>
          <Button colorScheme="red" ml={3} onClick={onDelete}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
