import React, { FunctionComponent } from "react";
import { useGoogleAuth } from "../auth/GoogleAuthProvider";
import "../../sass/loginPage.scss";
import LoginButton from "../auth/LoginButton";
import NavigationLayout from "../navigation/NavigationLayout";

type LoginPageProps = {};

const LoginPage: FunctionComponent<LoginPageProps> = () => {
  const { user, authenticated } = useGoogleAuth();

  const handleLogout = () => {
    gapi.auth2
      .getAuthInstance()
      .signOut()
      .then(() => {
        console.log("signed out");
      });
  };

  return (
    <NavigationLayout>
      <div id="login-container">
        <section id="google-login">
          <h4>Login to your account</h4>
          <LoginButton />
        </section>
        <section>
          <button onClick={handleLogout}>Google logout</button>
        </section>
      </div>
    </NavigationLayout>
  );
};

export default LoginPage;
