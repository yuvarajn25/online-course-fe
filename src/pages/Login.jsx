import React, { useState } from "react";
import { Input } from "@chakra-ui/input";
import { Flex, Text } from "@chakra-ui/layout";
import { Select, useToast } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";

import { Link as RouteLink, useHistory } from "react-router-dom";

import { Link } from "@chakra-ui/layout";
import {
  signUp,
  signIn,
  resendConfirmationCode,
  confirmSignUp,
} from "../helpers/authentication";
import { connect } from "react-redux";
import { setLoader } from "../redux/actions/loader";
import { HOME, LOGIN, SIGNUP } from "../routes";

function Login({ isLogin, dispatch, user }) {
  const toast = useToast();
  let history = useHistory();
  const [fieldValues, setFieldValues] = useState({
    name: "",
    email: "",
    password: "",
    code: "",
    role: "",
  });

  if (user) history.push(HOME);

  const [isConfirmation, setConfirmation] = useState(false);

  const onChange = (field) => (event) => {
    setFieldValues({ ...fieldValues, [field]: event.target.value });
  };

  const submit = async (event) => {
    event.preventDefault();
    const { email, password, name, code, role } = fieldValues;

    if (isConfirmation) {
      try {
        await confirmSignUp(email, code);
        toast({
          title: "Confirmed. Login to continue",
          position: "top",
          status: "success",
          isClosable: true,
        });
        history.push(LOGIN);
        setConfirmation(false);
        setFieldValues({ ...fieldValues, password: "" });
      } catch (error) {
        toast({
          title: error.message,
          position: "top",
          status: "error",
          isClosable: true,
        });
      }
      return;
    }
    if (isLogin) {
      try {
        dispatch(setLoader(true));
        await signIn(email, password);
        dispatch(setLoader(false));
        history.push(HOME);
      } catch (error) {
        dispatch(setLoader(false));
        toast({
          title: error.message,
          position: "top",
          status: "error",
          isClosable: true,
        });
      }
    } else {
      try {
        await signUp({ email, password, name, role });
        toast({
          title: "Signed up successfully. Please confirm you email",
          position: "top",
          status: "success",
          isClosable: true,
        });
        setConfirmation(true);
      } catch (error) {
        toast({
          title: error.message,
          position: "top",
          status: "error",
          isClosable: true,
        });
      }
    }
  };

  const resendConfirmation = async () => {
    try {
      await resendConfirmationCode(fieldValues.email);
      setConfirmation(true);
      toast({
        title: "Resend confirmation email.",
        position: "top",
        status: "success",
        isClosable: true,
      });
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
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" backgroundColor="gray.100" p={12} rounded={6}>
        <Text mb={6} textAlign="center" fontWeight="bold">
          {isLogin ? "Login" : "Signup"}
        </Text>
        <form onSubmit={submit}>
          {!isLogin && (
            <>
              <FormControl id="name" isRequired>
                <FormLabel fontSize="85%">Name</FormLabel>
                <Input
                  borderColor="blackAlpha.300"
                  mb={6}
                  variant="filled"
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={fieldValues.name}
                  onChange={onChange("name")}
                />
              </FormControl>
              <FormControl id="role" isRequired>
                <FormLabel fontSize="85%">User Type</FormLabel>
                <Select
                  borderColor="blackAlpha.300"
                  mb={6}
                  variant="filled"
                  placeholder="Select option"
                  type="text"
                  name="role"
                  value={fieldValues.role}
                  onChange={onChange("role")}
                >
                  <option value="TUTOR">TUTOR</option>
                  <option value="STUDENT">STUDENT</option>
                </Select>
              </FormControl>
            </>
          )}
          <FormControl id="email" isRequired>
            <FormLabel fontSize="85%">Email</FormLabel>
            <Input
              borderColor="blackAlpha.300"
              mb={6}
              variant="filled"
              placeholder="Email"
              type="email"
              name="email"
              value={fieldValues.email}
              onChange={onChange("email")}
            />
          </FormControl>
          {isConfirmation ? (
            <FormControl id="confirm" isRequired>
              <FormLabel fontSize="85%">Confirmation Code</FormLabel>
              <Input
                borderColor="blackAlpha.300"
                type="text"
                mb={6}
                variant="filled"
                placeholder="*********"
                name="code"
                value={fieldValues.code}
                onChange={onChange("code")}
              />
            </FormControl>
          ) : (
            <FormControl id="Password" isRequired>
              <FormLabel fontSize="85%">Password</FormLabel>
              <Input
                borderColor="blackAlpha.300"
                type="password"
                mb={6}
                variant="filled"
                placeholder="*********"
                name="password"
                value={fieldValues.password}
                onChange={onChange("password")}
              />
            </FormControl>
          )}
          <Input
            type="submit"
            bgColor="#1293d2"
            color="#fff"
            value={isLogin ? "Login" : "Signup"}
          />{" "}
        </form>
        <Text mt={3}>
          <Link as={RouteLink} to={isLogin ? SIGNUP : LOGIN}>
            {isLogin
              ? "do not have account? Signup here"
              : "Already have account? Login here"}
          </Link>
          {isLogin && (
            <Text textAlign={"center"} marginTop={2}>
              <Link onClick={resendConfirmation}>Resend Confirmation</Link>
            </Text>
          )}
        </Text>
      </Flex>
    </Flex>
  );
}
const mapStateToProps = (state, props) => {
  return { ...state, ...props };
};
export default connect(mapStateToProps)(Login);
