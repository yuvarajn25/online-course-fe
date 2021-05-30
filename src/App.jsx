import React, { useEffect, useState } from "react";
import "./App.css";
import Amplify, { Hub } from "aws-amplify";
import awsExports from "./aws-exports";
import Login from "./pages/Login";
import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Loader from "./components/Loader";
import { connect } from "react-redux";
import { checkCurrentUser, setUser } from "./redux/actions/user";
import Home from "./pages/Home";
import Header from "./components/Header";
import CourseView from "./pages/CourseView";
import { COURSE, HOME, LOGIN, SIGNUP } from "./routes";

function App({ dispatch, user }) {
  Amplify.configure(awsExports);
  const listener = (data) => {
    switch (data.payload.event) {
      case "signIn":
        dispatch(setUser(data.payload.data));
        break;
      case "signOut":
        dispatch(setUser(null));
        console.log("user signed out");
        break;
    }
  };

  Hub.listen("auth", listener);

  useEffect(() => {
    dispatch(checkCurrentUser());
  }, [user]);

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /signin page
      <Route
        {...rest}
        render={(props) =>
          user ? (
            <div>
              <Header />
              <Component {...props} />
            </div>
          ) : (
            <Redirect to={LOGIN} />
          )
        }
      />
    );
  };

  return (
    <ChakraProvider>
      <Loader />
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return user ? <Redirect to="/home" /> : <Redirect to="/login" />;
            }}
          />
          <Route exact path={LOGIN}>
            <Login isLogin={true} />
          </Route>
          <Route exact path={SIGNUP}>
            <Login isLogin={false} />
          </Route>
          <PrivateRoute exact path={HOME} component={Home} />
          <PrivateRoute exact path={`${COURSE}/:id`} component={CourseView} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

const mapStateToProps = (state, props) => {
  return { ...state, ...props };
};
export default connect(mapStateToProps)(App);
