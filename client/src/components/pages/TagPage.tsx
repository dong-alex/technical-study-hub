import React, { FunctionComponent } from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import NavigationLayout from "../layout/NavigationLayout";
import TagForm from "../utils/TagForm";
import { TagPageParams } from "../../types";

const Header = styled.div`
  display: flex;
  place-items: center;
  justify-content: center;
`;

const RedirectButton = styled(Button)`
  > span > span {
    margin: 0;
  }
  margin-right: 1rem;
`;

interface TagPageProps extends RouteComponentProps<TagPageParams> {}

// singular tag overview page
const TagPage: FunctionComponent<TagPageProps> = ({
  match: {
    params: { id: tagId },
  },
}: TagPageProps) => {
  return (
    <NavigationLayout>
      <Header>
        <NavLink to="/tags">
          <RedirectButton
            variant="contained"
            color="primary"
            startIcon={<ChevronLeft />}
          />
        </NavLink>
        <h1>Tag Details</h1>
      </Header>
      <h2>Update Your Tag</h2>
      <TagForm isUpdate={true} tagId={tagId} />
    </NavigationLayout>
  );
};

export default TagPage;
