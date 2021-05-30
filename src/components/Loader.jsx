import React from "react";
import { Flex } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { connect } from "react-redux";

function Loader({ isLoading }) {
  return isLoading ? (
    <Flex
      width="100vw"
      height="100vh"
      backgroundColor="gray.200"
      zIndex="100"
      position="fixed"
      opacity="0.5"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  ) : (
    <div></div>
  );
}

const mapStateToProps = (state, props) => {
  return { isLoading: state.isLoading };
};

export default connect(mapStateToProps)(Loader);
