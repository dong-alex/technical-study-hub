import React, { FunctionComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import { PrivateRouteProps, ComponentProps } from "../../types";

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
