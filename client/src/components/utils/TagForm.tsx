import React, {
  FunctionComponent,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Tag, TagFormProps, Color } from "../../types";
import { useDataProvider } from "../../hooks/DataProvider";
import { Select, MenuItem, ListItemText } from "@material-ui/core";
import colors from "../utils/colors";

type ColorPreviewProps = {
  color: string;
};

const TagNameInput = styled(TextField)`
  margin-right: 3rem;
  // height: 30px;
`;

const ColorPreview = styled.div`
  height: 1rem;
  width: 1rem;
  margin: 0 1rem 0 0;
  background-color: ${(props: ColorPreviewProps) => props.color};
`;

const ColorSelect = styled(Select)`
  min-width: 120px;
  max-width: 500px;

  > div {
    display: flex;
    padding: 0.5rem 2rem 0.5rem 1rem;
    place-items: center;
  }
`;

const ColorItem = styled(MenuItem)`
  display: flex;
  padding: 0.5rem 2rem 0.5rem 1rem;
  place-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  margin: 0 2rem 0 2rem;
`;

const FormContainer = styled.div`
  display: flex;
  place-items: center;
  flex-direction: column;
`;

const TagForm: FunctionComponent<TagFormProps> = ({ tagId, isUpdate }) => {
  const { tags, createTag, updateTag } = useDataProvider();
  const [currentTagName, setCurrentTagName] = useState<string>("");
  const [currentTagColor, setCurrentTagColor] = useState<string>("#AAA");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const history = useHistory();

  useEffect(() => {
    // grab the corresponding tag details - only for updating
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

  // TODO: validation with the string length of total # tags
  const handleTagNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentTagName(event.target.value);
  };

  const handleAddTag = async (event: any) => {
    event.preventDefault();
    let success = false;
    try {
      success = await createTag(currentTagName, currentTagColor);
      setErrorMessage("");
      return success;
    } catch (err) {
      setErrorMessage(err.response.data.message);
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
      setErrorMessage(err.response.data.message);
      return false;
    }
  };

  const handleColorChange = (event: ChangeEvent<{ value: unknown }>) => {
    setCurrentTagColor(event.target.value as string);
  };

  return (
    <FormContainer>
      {errorMessage !== "" && <Alert severity="error">{errorMessage}</Alert>}
      <InputContainer>
        <TagNameInput
          name="tagName"
          label="Tag Name"
          onChange={handleTagNameChange}
          value={currentTagName}
        />
        <ColorSelect value={currentTagColor} onChange={handleColorChange}>
          {colors.map(({ colorName, hex }: Color) => (
            <ColorItem key={hex} value={hex}>
              <ColorPreview color={hex} />
              <ListItemText primary={colorName} />
            </ColorItem>
          ))}
        </ColorSelect>
        {isUpdate ? (
          <StyledButton
            color="primary"
            variant="contained"
            onClick={handleUpdateTag}
          >
            Update Tag
          </StyledButton>
        ) : (
          <StyledButton
            color="primary"
            variant="contained"
            onClick={handleAddTag}
          >
            Add Tag
          </StyledButton>
        )}
      </InputContainer>
    </FormContainer>
  );
};

export default TagForm;
