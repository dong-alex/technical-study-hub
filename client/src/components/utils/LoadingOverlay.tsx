import React from "react";
import { ProgressBar } from "react-materialize";
import styled from "styled-components";

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
