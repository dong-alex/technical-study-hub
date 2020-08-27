import React, { FunctionComponent } from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import NavigationLayout from "../layout/NavigationLayout";
import QuestionForm from "../utils/QuestionForm";
import { QuestionPageParams } from "../../types";

const Header = styled.div`
  display: flex;
  place-items: center;
  justify-content: center;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
`;

const Title = styled.h4`
  margin: 0 0 0 0.5rem;
  user-select: none;
`;

interface QuestionPageProps extends RouteComponentProps<QuestionPageParams> {}

// singular tag overview page
const QuestionPage: FunctionComponent<QuestionPageProps> = ({
  match: {
    params: { id: questionId },
  },
}: QuestionPageProps) => {
  return (
    <NavigationLayout>
      <Header>
        <NavLink to="/questions">
          <Button
            color="primary"
            variant="contained"
            startIcon={<ChevronLeft />}
          />
        </NavLink>
        <Title>Question Details</Title>
      </Header>
      <h6>Update Your Question</h6>
      <QuestionForm questionId={questionId} isUpdate />
    </NavigationLayout>
  );
};

export default QuestionPage;
