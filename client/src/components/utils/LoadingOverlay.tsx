import React from "react";
import styled from "styled-components";
import { ProgressBar } from "react-materialize";

const ProgressBarContainer = styled.div`
  display: flex;
  height: 100%;
  place-items: center;
`;

const LoadingOverlay = () => {
  return (
    <ProgressBarContainer>
      <ProgressBar />
    </ProgressBarContainer>
  );
};

export default LoadingOverlay;
