import React, { FunctionComponent, useState } from "react";
import NavigationLayout from "../layout/NavigationLayout";
import TableDashboard from "../utils/TableDashboard";
import QuestionForm from "../utils/QuestionForm";
import { RouteComponentProps } from "react-router-dom";

interface RedirectedPageProps extends RouteComponentProps {}

const QuestionDashboardPage: FunctionComponent<RedirectedPageProps> = () => {
  return (
    <NavigationLayout>
      <h4>Question Dashboard</h4>
      <h6>Create New Questions</h6>
      <QuestionForm isUpdate={false} />
      <TableDashboard isTag={false} />
    </NavigationLayout>
  );
};

export default QuestionDashboardPage;
