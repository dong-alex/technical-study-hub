import React, { FunctionComponent } from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import NavigationLayout from "../layout/NavigationLayout";
import TagForm from "../utils/TagForm";
import { TagPageParams } from "../../types";

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
          <Button
            variant="contained"
            color="primary"
            startIcon={<ChevronLeft />}
          />
        </NavLink>
        <Title>Tag Details</Title>
      </Header>
      <h6>Update Your Tag</h6>
      <TagForm isUpdate={true} tagId={tagId} />
    </NavigationLayout>
  );
};

export default TagPage;
