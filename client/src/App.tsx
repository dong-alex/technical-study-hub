import React, { FunctionComponent } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./sass/app.scss";
import "materialize-css";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import PrivateRoute from "./components/auth/PrivateRoute";
import DynamicPrivateRoute from "./components/auth/DynamicPrivateRoute";
import { useAuthProvider } from "./components/auth/AuthenticationProvider";
import TagDashboardPage from "./components/pages/TagDashboardPage";
import QuestionDashboardPage from "./components/pages/QuestionDashboardPage";
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
            component={QuestionDashboardPage}
          />
          <PrivateRoute
            authenticated={authenticated}
            path="/tags"
            exact
            component={TagDashboardPage}
          />
          <DynamicPrivateRoute
            authenticated={authenticated}
            path="/tags/:id"
            component={TagPage}
          />
          <DynamicPrivateRoute
            authenticated={authenticated}
            path="/questions/:id"
            component={QuestionPage}
          />
          <Route
            path="/login"
            exact
            component={
              authenticated ? () => <Redirect to="/questions" /> : LoginPage
            }
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
