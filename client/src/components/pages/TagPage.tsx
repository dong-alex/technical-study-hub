import React, {
  FunctionComponent,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { NavLink, Redirect, RouteComponentProps } from "react-router-dom";
import { Row, Col, Button, TextInput, Dropdown, Icon } from "react-materialize";
import { CirclePicker } from "react-color";

import styled from "styled-components";
import NavigationLayout from "../layout/NavigationLayout";
import { Tag } from "../../hooks/reducers/tagsReducer";
import useTags from "../../hooks/useTags";

type TagParams = { id: string };
type ColorPreviewProps = {
  backgroundColor: string;
};

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

const ColorPreview = styled.div`
  height: 2rem;
  width: 2rem;
  border: 1px solid black;
  background-color: ${(props: ColorPreviewProps) => props.backgroundColor};

  &:hover {
    transform: scale(1.1);
  }
`;

const TagNameInput = styled(TextInput)`
  width: 100%;
  height: 30px;
`;

const TagForm = styled(Row)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  place-items: center;
  padding: 1rem 0 1rem 0;
`;

const ColorDropdown = styled(Dropdown)`
  height: fit-content;
  width: 300px !important;
`;

interface TagPageProps extends RouteComponentProps<TagParams> {}

// singular tag overview page
const TagPage: FunctionComponent<TagPageProps> = ({
  match: {
    params: { id: tagId },
  },
}: TagPageProps) => {
  const { tags, updateTag } = useTags();
  const [currentTagName, setCurrentTagName] = useState<string>("");
  const [currentTagColor, setCurrentTagColor] = useState<string>("#AAA");

  useEffect(() => {
    console.log("TagPage ID: ", tagId);

    // grab the corresponding tag details
    if (tagId && tags.length > 0) {
      console.log(tags);
      const specificTag: Tag | undefined = tags.find(
        (tag: Tag) => tag._id === tagId
      );

      if (specificTag) {
        const { tagName, tagColor } = specificTag;
        setCurrentTagName(tagName);
        setCurrentTagColor(tagColor);
      } else {
        // these errors should not be hit
        throw new Error("Tags empty or TagID invalid");
      }
      // set the current UI with these details
    }
  }, [tags, tagId]);

  const handleColorChange = ({ hex }: { hex: string }) => {
    setCurrentTagColor(hex);
  };

  // TODO: validation with the string length of total # tags
  const handleTagNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentTagName(event.target.value);
  };

  const handleUpdateTag = async () => {
    await updateTag(tagId, currentTagName, currentTagColor);
  };

  return (
    <NavigationLayout>
      <Header>
        <NavLink to="/tags">
          <Button floating icon={<Icon>chevron_left</Icon>} />
        </NavLink>
        <Title>Tag Details</Title>
      </Header>
      <h6>Update Your Tag</h6>
      <TagForm>
        <Col s={10} m={7}>
          <TagNameInput
            name="tagName"
            label="Tag Name"
            noLayout
            onChange={handleTagNameChange}
            value={currentTagName}
          />
        </Col>
        <Col s={2} m={1}>
          <ColorDropdown
            trigger={<ColorPreview backgroundColor={currentTagColor} />}
          >
            <CirclePicker
              color={currentTagColor}
              onChangeComplete={handleColorChange}
            />
          </ColorDropdown>
        </Col>
        <Col s={12} m={4}>
          <Button
            className="light-blue lighten-2 hoverable"
            onClick={handleUpdateTag}
            waves="light"
          >
            Save Tag
          </Button>
        </Col>
      </TagForm>
    </NavigationLayout>
  );
};

export default TagPage;
