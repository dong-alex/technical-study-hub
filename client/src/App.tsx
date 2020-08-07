import React, { FunctionComponent, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./sass/app.scss";
import HomePage from "./components/home/HomePage";
import LoginPage from "./components/login/LoginPage";
import PrivateRoute from "./components/auth/PrivateRoute";

type AppProps = {};

const App: FunctionComponent<AppProps> = () => {
  return (
    <div className="root">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={LoginPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
