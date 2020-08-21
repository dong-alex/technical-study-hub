import { RouteComponentProps } from "react-router-dom";
import { StaticContext } from "react-router";

type LocationState = {
  updateSuccess?: boolean;
};

export type RouteHistoryProps = RouteComponentProps<{}, StaticContext, LocationState>