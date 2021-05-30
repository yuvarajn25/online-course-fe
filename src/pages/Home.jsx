import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CourseList from "../components/CourseList";
import Header from "../components/Header";

function Home({ user }) {
  const [role, setRole] = useState(null);
  useEffect(() => {
    setRole(user.role);
  }, [user]);

  return (
    <div>
      <CourseList role={role} />
    </div>
  );
}
const mapStateToProps = (state, props) => {
  return { ...state, ...props };
};
export default connect(mapStateToProps)(Home);
