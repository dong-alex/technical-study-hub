import React, { FunctionComponent } from "react";
import { Route, Redirect } from "react-router-dom";

type PrivateRouteProps = {
  authenticated: boolean;
  component: FunctionComponent;
  path: string;
  exact: boolean;
};

type ComponentProps = {};

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  authenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props: ComponentProps) =>
      authenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default PrivateRoute;
