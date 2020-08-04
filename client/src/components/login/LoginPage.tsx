import React, { FunctionComponent, useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";

type LoginPageProps = {};

const responseGoogle = (response: any) => {
  console.log(response);
};

const responseSuccess = (response: any) => {
  // use googleId as userID for the submissions
  const {
    profileObj: { googleId },
  } = response;
  console.log(googleId);
};

const LoginPage: FunctionComponent<LoginPageProps> = () => {
  return (
    <GoogleLogin
      theme="dark"
      clientId="35960364936-9ek2vss6n85lgnocs986u1ioaqoiv48c.apps.googleusercontent.com"
      responseType="id_token"
      isSignedIn={true}
      onSuccess={responseSuccess}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default LoginPage;
