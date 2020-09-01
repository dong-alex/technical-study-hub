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
`;

interface QuestionPageProps extends RouteComponentProps<QuestionPageParams> {}

const RedirectButton = styled(Button)`
  > span > span {
    margin: 0;
  }
  margin-right: 1rem;
`;

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
          <RedirectButton
            color="primary"
            variant="contained"
            startIcon={<ChevronLeft />}
          />
        </NavLink>
        <h1>Question Details</h1>
      </Header>
      <h2>Update Your Question</h2>
      <QuestionForm questionId={questionId} isUpdate />
    </NavigationLayout>
  );
};

export default QuestionPage;
