import React, { FunctionComponent } from "react";
import { StaticContext } from 'react-router';
import { Route, Redirect, RouteComponentProps } from "react-router-dom";

type PrivateRouteProps = {
  authenticated: boolean;
  component: FunctionComponent<ComponentProps>;
  path: string;
  exact?: boolean;
};

type LocationState = {
  updateSuccess?: boolean;
}

type CustomRouteComponentProps = RouteComponentProps<{}, StaticContext,   LocationState>;

interface ComponentProps extends CustomRouteComponentProps { };
  
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
