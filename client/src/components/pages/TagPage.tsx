import React, {
  FunctionComponent,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { Icon, Button } from "react-materialize";
import styled from "styled-components";
import NavigationLayout from "../layout/NavigationLayout";
import { Tag } from "../../hooks/reducers/tagsReducer";
import useTags from "../../hooks/useTags";
import TagForm from "../utils/TagForm";

type TagParams = { id: string };

const Header = styled.div`
  display: flex;
  place-items: center;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
`;

const Title = styled.h4`
  margin: 0 0 0 0.5rem;
  user-select: none;
`;

interface TagPageProps extends RouteComponentProps<TagParams> {}

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
          <Button floating icon={<Icon>chevron_left</Icon>} />
        </NavLink>
        <Title>Tag Details</Title>
      </Header>
      <h6>Update Your Tag</h6>
      <TagForm isUpdate={true} tagId={tagId} />
    </NavigationLayout>
  );
};

export default TagPage;
