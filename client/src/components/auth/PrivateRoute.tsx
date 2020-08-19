import React, { FunctionComponent } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";

type PrivateRouteProps = {
  authenticated: boolean;
  component: FunctionComponent<ComponentProps>;
  path: string;
  exact?: boolean;
};

interface ComponentProps extends RouteComponentProps {}

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
