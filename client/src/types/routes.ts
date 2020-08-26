import { RouteComponentProps } from "react-router-dom";
import { StaticContext } from "react-router";
import { FunctionComponent } from "react";

export type LocationState = {
  updateSuccess?: boolean;
};

export interface ComponentProps extends CustomRouteComponentProps {}

export type RouteHistoryProps = RouteComponentProps<
  {},
  StaticContext,
  LocationState
>;

export type PrivateRouteProps = {
  authenticated: boolean;
  component: FunctionComponent<ComponentProps>;
  path: string;
  exact?: boolean;
};

export type CustomRouteComponentProps = RouteComponentProps<
  {},
  StaticContext,
  LocationState
>;

export type DynamicPrivateRouteProps = {
  authenticated: boolean;
  component: FunctionComponent<DynamicComponentProps>;
  path: string;
  exact?: boolean;
};

export type IDParam = { id: string };

export interface DynamicComponentProps extends RouteComponentProps<IDParam> {}
