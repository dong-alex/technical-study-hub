import React, {
  FunctionComponent,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import {
  Button,
  Row,
  Col,
  TextInput,
  Dropdown,
  Pagination,
} from "react-materialize";
import { CirclePicker } from "react-color";
import styled from "styled-components";
import TableDashboard from "../utils/TableDashboard";
import NavigationLayout from "../layout/NavigationLayout";
import { Tag } from "../../hooks/reducers/tagsReducer";
import useTags from "../../hooks/useTags";
import usePagination from "../../hooks/usePagination";

type TagDashboardPageProps = {};
type ColorPreviewProps = {
  backgroundColor: string;
};

const TagNameInput = styled(TextInput)`
  width: 100%;
  height: 30px;
`;

const ColorPreview = styled.div`
  height: 2rem;
  width: 2rem;
  border: 1px solid black;
  background-color: ${(props: ColorPreviewProps) => props.backgroundColor};

  &:hover {
    transform: scale(1.1);
  }
`;

const TagForm = styled(Row)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  place-items: center;
  padding: 0 0 1rem 0;
`;

const ColorDropdown = styled(Dropdown)`
  height: fit-content;
  width: 300px !important;
`;

const TagDashboardPage: FunctionComponent<TagDashboardPageProps> = () => {
  const [tagName, setTagName] = useState<string>("");
  const [tagColor, setTagColor] = useState<string>("#AAA");
  const { tags, loadingTags, createTag } = useTags();

  const handleColorChange = ({ hex }: { hex: string }) => {
    setTagColor(hex);
  };

  // TODO: validation with the string length of total # tags
  const handleTagNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTagName(event.target.value);
  };

  const handleAddTag = async (event: any) => {
    event.preventDefault();
    let success = false;
    try {
      success = await createTag(tagName, tagColor);
      return success;
    } catch (err) {
      return success;
    }
  };

  return (
    <NavigationLayout>
      <h4>Tag Dashboard</h4>
      <h6>Create New Tag</h6>
      <TagForm>
        <Col s={10} m={7}>
          <TagNameInput
            name="tagName"
            label="Tag Name"
            noLayout
            onChange={handleTagNameChange}
            value={tagName}
          />
        </Col>
        <Col s={2} m={1}>
          <ColorDropdown trigger={<ColorPreview backgroundColor={tagColor} />}>
            <CirclePicker
              color={tagColor}
              onChangeComplete={handleColorChange}
            />
          </ColorDropdown>
        </Col>
        <Col s={12} m={4}>
          <Button
            className="light-blue lighten-2 hoverable"
            onClick={handleAddTag}
          >
            Add Tag
          </Button>
        </Col>
      </TagForm>
      <TableDashboard data={tags} isTag loadingState={loadingTags} />
    </NavigationLayout>
  );
};

export default TagDashboardPage;
