import React, { FunctionComponent } from "react";
import LoginPage from "./components/login/LoginPage";

type AppProps = {};

const App: FunctionComponent<AppProps> = () => {
  return (
    <>
      <LoginPage />
    </>
  );
};

export default App;
