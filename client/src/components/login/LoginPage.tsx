import React, { FunctionComponent, useState, useEffect } from "react";
import { useGoogleAuth } from "../auth/GoogleAuthProvider";
import "./loginPage.scss";

type LoginPageProps = {};

const LoginPage: FunctionComponent<LoginPageProps> = () => {
  const { user, authenticated, LoginButton, LogoutButton } = useGoogleAuth();

  useEffect(() => {
    console.log("The current user is", user);
  }, [user]);

  return (
    <div id="login-page">
      <section>{authenticated ? <LogoutButton /> : <LoginButton />}</section>
    </div>
  );
};

export default LoginPage;
