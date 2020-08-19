import React, { FunctionComponent } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";

type DynamicPrivateRouteProps = {
  authenticated: boolean;
  component: FunctionComponent<ComponentProps>;
  path: string;
  exact?: boolean;
};

type IDParam = { id: string };

interface ComponentProps extends RouteComponentProps<IDParam> {}

const DynamicPrivateRoute: FunctionComponent<DynamicPrivateRouteProps> = ({
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

export default DynamicPrivateRoute;
