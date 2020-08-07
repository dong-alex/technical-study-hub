import React, { FunctionComponent } from "react";

type LoginButtonProps = {};

// use google to attach button to the id
const LoginButton: FunctionComponent<LoginButtonProps> = () => {
  return <div id="google-signin-button" />;
};

export default LoginButton;
