import React, { FunctionComponent } from "react";
import { useGoogleAuth } from "./auth/GoogleAuthProvider";

type LoadingScreenProps = {};

const LoadingScreen: FunctionComponent<LoadingScreenProps> = () => {
  const { loaded } = useGoogleAuth();

  return loaded ? <div id="screen-overlay" /> : <div />;
};
export default LoadingScreen;
