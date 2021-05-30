import { Auth, Hub } from "aws-amplify";

const getCurrentUser = () => Auth.currentAuthenticatedUser();

const getCurrentUserInfo = () => Auth.currentUserInfo();

const signUp = async (payload) => {
  try {
    const { user } = await Auth.signUp({
      username: payload.email,
      password: payload.password,
      attributes: {
        email: payload.email,
        name: payload.name,
        ["custom:role"]: payload.role,
      },
    });
  } catch (error) {
    console.log("error signing up:", error);
    throw error;
  }
};

const signIn = async (username, password) => {
  try {
    const user = await Auth.signIn(username, password);
  } catch (error) {
    console.log("error signing in", error);
    throw error;
  }
};

const resendConfirmationCode = async (email) => {
  try {
    await Auth.resendSignUp(email);
  } catch (error) {
    console.log("error resending code: ", error);
    throw error;
  }
};

const confirmSignUp = async (email, code) => {
  try {
    await Auth.confirmSignUp(email, code);
  } catch (error) {
    console.log("error confirming sign up", error);
    throw error;
  }
};

const signOut = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    throw error;
  }
};

export {
  getCurrentUser,
  signUp,
  getCurrentUserInfo,
  signIn,
  resendConfirmationCode,
  confirmSignUp,
  signOut,
};
