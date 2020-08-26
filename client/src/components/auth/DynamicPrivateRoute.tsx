import React, { FunctionComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import { DynamicPrivateRouteProps, DynamicComponentProps } from "../../types";

const DynamicPrivateRoute: FunctionComponent<DynamicPrivateRouteProps> = ({
  authenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props: DynamicComponentProps) =>
      authenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default DynamicPrivateRoute;
