import React from "react";
import styled from "styled-components";

const ProgressBarContainer = styled.div`
  display: flex;
  height: 100%;
  place-items: center;
`;

const LoadingOverlay = () => {
  return (
    <ProgressBarContainer>
      <div></div>
    </ProgressBarContainer>
  );
};

export default LoadingOverlay;
