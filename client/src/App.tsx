import React, { FunctionComponent, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./sass/app.scss";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import PrivateRoute from "./components/auth/PrivateRoute";
import { useAuthProvider } from "./components/auth/AuthenticationProvider";
import TagPage from "./components/pages/TagPage";
import QuestionPage from "./components/pages/QuestionPage";

type AppProps = {};

const App: FunctionComponent<AppProps> = () => {
  const { authenticated } = useAuthProvider();

  return (
    <div className="root">
      <Router>
        <Switch>
          <PrivateRoute
            authenticated={authenticated}
            path="/"
            exact
            component={HomePage}
          />
          <PrivateRoute
            authenticated={authenticated}
            path="/questions"
            exact
            component={QuestionPage}
          />
          <PrivateRoute
            authenticated={authenticated}
            path="/tags"
            exact
            component={TagPage}
          />
          <Route
            path="/login"
            exact
            component={
              authenticated ? () => <Redirect to="/tags" /> : LoginPage
            }
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
