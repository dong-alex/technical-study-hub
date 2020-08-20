import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router-dom";
import TableDashboard from "../utils/TableDashboard";
import NavigationLayout from "../layout/NavigationLayout";
import TagForm from "../utils/TagForm";

interface TagDashboardPageProps extends RouteComponentProps {}

const TagDashboardPage: FunctionComponent<TagDashboardPageProps> = () => {
  return (
    <NavigationLayout>
      <h4>Tag Dashboard</h4>
      <h6>Create New Tag</h6>
      <TagForm isUpdate={false} />
      <TableDashboard isTag />
    </NavigationLayout>
  );
};

export default TagDashboardPage;
