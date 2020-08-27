import React, {
  FunctionComponent,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { useHistory } from "react-router-dom";
import { CirclePicker } from "react-color";
import styled from "styled-components";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Tag, TagFormProps } from "../../types";
import { useDataProvider } from "../../hooks/DataProvider";

type ColorPreviewProps = {
  color: string;
};

const TagNameInput = styled(TextField)`
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

const InputContainer = styled.div`
  display: flex;
  place-items: center;
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
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
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
        <TextField
          onClick={() => {
            console.log("OPEN");
            setShowColorPicker(true);
          }}
        >
          {showColorPicker && (
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute" }}>
                <div
                  style={{
                    position: "fixed",
                    top: "0px",
                    right: "0px",
                    bottom: "0px",
                    left: "0px",
                  }}
                  onClick={() => {}}
                />
                <CirclePicker
                  color={currentTagColor}
                  onChangeComplete={handleColorChange}
                />
              </div>
            </div>
          )}
        </TextField>
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
