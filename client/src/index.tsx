import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthenticationProvider } from "./components/auth/AuthenticationProvider";
import { StylesProvider } from "@material-ui/core/styles";

ReactDOM.render(
  <React.StrictMode>
    <AuthenticationProvider>
      <StylesProvider injectFirst>
        <App />
      </StylesProvider>
    </AuthenticationProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
