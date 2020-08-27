import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthenticationProvider } from "./components/auth/AuthenticationProvider";
import CssBaseLine from "@material-ui/core/CssBaseline";

ReactDOM.render(
  <React.StrictMode>
    <AuthenticationProvider>
      <CssBaseLine />
      <App />
    </AuthenticationProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
