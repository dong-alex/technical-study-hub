import React, {
  FunctionComponent,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { useHistory } from "react-router-dom";
import { Dropdown, Button, TextInput } from "react-materialize";
import { CirclePicker } from "react-color";
import styled from "styled-components";
import { Tag, TagFormProps } from "../../types";

import { useDataProvider } from "../../hooks/DataProvider";

type ColorPreviewProps = {
  color: string;
};

const TagNameInput = styled(TextInput)`
  margin-right: 3rem;
  height: 30px;
`;

const ColorPreview = styled.div`
  height: 2rem;
  width: 2rem;
  margin: 0 2rem 0 2rem;
  border: 1px solid black;
  background-color: ${(props: ColorPreviewProps) => props.color};

  &:hover {
    transform: scale(1.1);
  }
`;

const FormContainer = styled.div`
  display: flex;
  place-items: center;
  justify-content: center;
`;

const ColorDropdown = styled(Dropdown)`
  height: fit-content;
  margin: 0 2rem 0 2rem;
  width: 300px !important;
`;

const StyledButton = styled(Button)`
  margin: 0 2rem; 0 2rem;
`;

const TagForm: FunctionComponent<TagFormProps> = ({ tagId, isUpdate }) => {
  const { tags, createTag, updateTag } = useDataProvider();
  const [currentTagName, setCurrentTagName] = useState<string>("");
  const [currentTagColor, setCurrentTagColor] = useState<string>("#AAA");
  const history = useHistory();

  useEffect(() => {
    // grab the corresponding tag details
    if (tagId && tags.length > 0) {
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

  const handleAddTag = async (event: any) => {
    event.preventDefault();
    let success = false;
    try {
      success = await createTag(currentTagName, currentTagColor);
      return success;
    } catch (err) {
      return success;
    }
  };

  const handleUpdateTag = async (event: any) => {
    event.preventDefault();
    try {
      await updateTag(tagId, currentTagName, currentTagColor);
      history.push("/tags", { updateSuccess: true });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return (
    <FormContainer>
      <TagNameInput
        name="tagName"
        label="Tag Name"
        onChange={handleTagNameChange}
        value={currentTagName}
      />
      <ColorDropdown trigger={<ColorPreview color={currentTagColor} />}>
        <CirclePicker
          color={currentTagColor}
          onChangeComplete={handleColorChange}
        />
      </ColorDropdown>
      {isUpdate ? (
        <StyledButton
          className="light-blue lighten-2 hoverable"
          onClick={handleUpdateTag}
        >
          Update Tag
        </StyledButton>
      ) : (
        <StyledButton
          className="light-blue lighten-2 hoverable"
          onClick={handleAddTag}
        >
          Add Tag
        </StyledButton>
      )}
    </FormContainer>
  );
};

export default TagForm;
