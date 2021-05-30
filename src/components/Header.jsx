import React from "react";
import { Flex, Text } from "@chakra-ui/layout";
import { connect } from "react-redux";
import { Icon, useToast } from "@chakra-ui/react";
import { FiPower } from "react-icons/fi";
import { signOut } from "../helpers/authentication";
import { setLoader } from "../redux/actions/loader";

function Header({ dispatch }) {
  const toast = useToast();
  const clickSignOut = async () => {
    try {
      dispatch(setLoader(true));
      await signOut();
      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
      toast({
        title: error.message,
        position: "top",
        status: "error",
        isClosable: true,
      });
    }
  };
  return (
    <Flex
      height="40px"
      backgroundColor="blue.300"
      alignItems="center"
      justifyContent="center"
      color="#FFF"
      fontWeight="bold"
      width="100%"
    >
      <Text>Online Course</Text>
      <Icon
        fontSize="1.5em"
        position="absolute"
        right="6"
        onClick={clickSignOut}
        as={FiPower}
      />
    </Flex>
  );
}
export default connect()(Header);
