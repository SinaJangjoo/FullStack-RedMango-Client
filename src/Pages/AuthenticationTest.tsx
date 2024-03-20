import React from "react";
import withAuth from "../HOC/withAuth";

function AuthenticationTest() {
  return <div>This Page can be accessed by any logged in user</div>;
}

export default withAuth(AuthenticationTest);
