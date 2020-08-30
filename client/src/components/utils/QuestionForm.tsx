import React, {
  FunctionComponent,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Alert from "@material-ui/lab/Alert";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import { Tag, Question } from "../../types";
import { useDataProvider } from "../../hooks/DataProvider";

type ColorPreviewProps = {
  backgroundcolor: string;
};

const FormContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

const NoteInput = styled(TextField)`
  margin: 1rem 2rem 1rem 0;
`;

const InputContainer = styled.div`
  display: flex;
  place-items: center;
  width: 100%;
`;

const DifficultyContainer = styled(FormControl)`
  margin-right: 1.5rem;
  margin-left: 1.5rem;
  width: 100px;
`;

const AttachContainer = styled(FormControl)`
  margin: 1rem;
  width: 300px;
`;

const ChipDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CustomChip = styled(Chip)`
  margin: 0.5rem;
  color: white;
  background: ${(props: ColorPreviewProps) => props.backgroundcolor};
`;

const NoteList = styled(List)`
  margin: 0 5rem;
  display: flex;
  flex-direction: column;
`;

const UrlInput = styled(TextField)`
  width: 100%;
  margin: 1rem 0;
`;

type QuestionFormState = {
  questionId?: string;
  isUpdate: boolean;
};

const QuestionForm: FunctionComponent<QuestionFormState> = ({
  questionId,
  isUpdate,
}) => {
  const { tags, questions, createQuestion, updateQuestion } = useDataProvider();
  const [currentDifficulty, setCurrentDifficulty] = useState<string>("Easy");
  const [currentQuestionName, setCurrentQuestionName] = useState<string>("");
  const [attachedTags, setAttachedTags] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [noteInput, setNoteInput] = useState<string>("");
  const [leetcodeUrl, setLeetcodeUrl] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    // grab the corresponding tag details
    if (questionId && questions.length > 0) {
      const specificQuestion: Question | undefined = questions.find(
        (question: Question) => question._id === questionId
      );

      if (specificQuestion) {
        const {
          name,
          difficulty,
          tags: attachedTags,
          notes: attachedNotes,
          url,
        } = specificQuestion;
        const tagIds = attachedTags.map((tag: Tag) => tag._id);
        setCurrentQuestionName(name);
        setCurrentDifficulty(difficulty);
        setAttachedTags(tagIds);
        setNotes(attachedNotes);
        setLeetcodeUrl(url);
      } else {
        // these errors should not be hit
        throw new Error("Questions empty or questionId invalid");
      }
      // set the current UI with these details
    }
  }, [questions, questionId]);

  const handleQuestionNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setCurrentQuestionName(event.target.value);
    } else {
      setCurrentQuestionName("");
    }
  };

  const handleNoteInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setNoteInput(event.target.value);
    } else {
      setNoteInput("");
    }
  };

  const handleTagChange = (event: any) => {
    setAttachedTags(event.target.value);
  };

  const handleDifficultyChange = (event: any) => {
    setCurrentDifficulty(event.target.value);
  };

  const resetFields = () => {
    setCurrentQuestionName("");
    setCurrentDifficulty("Easy");
    setAttachedTags([]);
    setNotes([]);
    setLeetcodeUrl("");
    setErrorMessage("");
  };

  // handle selecting values via materialize-css library
  const handleAddQuestion = async (event: any) => {
    event.preventDefault();
    try {
      await createQuestion(
        currentQuestionName,
        currentDifficulty,
        attachedTags,
        notes,
        leetcodeUrl
      );
      resetFields();
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
    }
  };

  const handleUpdateQuestion = async (event: any) => {
    event.preventDefault();
    try {
      await updateQuestion(
        questionId,
        currentQuestionName,
        currentDifficulty,
        attachedTags,
        notes,
        leetcodeUrl
      );
      history.push("/questions", { updateSuccess: true });
    } catch (err) {
      console.log(err.message);
      setErrorMessage(err.response.data.message);
    }
  };

  const handleAddNote = () => {
    if (noteInput === "") {
      return;
    }

    if (notes.includes(noteInput)) {
      setErrorMessage("Duplicate Note. Please enter a different note.");
      return;
    }

    setNotes([...notes, noteInput]);
    setNoteInput("");
    setErrorMessage("");
  };

  const handleRemoveNote = (deletedText: string) => {
    const newNotes = notes.filter(
      (noteText: string) => noteText !== deletedText
    );
    setNotes(newNotes);
  };

  const handleUrlChange = (event: any) => {
    setLeetcodeUrl(event.target.value);
  };

  return (
    <FormContainer>
      {errorMessage !== "" && <Alert severity="error">{errorMessage}</Alert>}
      <InputContainer>
        <TextField
          label="Question Name"
          required
          onChange={handleQuestionNameChange}
          value={currentQuestionName}
        />
        <DifficultyContainer>
          <InputLabel>Difficulty</InputLabel>
          <Select value={currentDifficulty} onChange={handleDifficultyChange}>
            <MenuItem value={"Easy"}>Easy</MenuItem>
            <MenuItem value={"Medium"}>Medium</MenuItem>
            <MenuItem value={"Hard"}>Hard</MenuItem>
          </Select>
        </DifficultyContainer>
        <AttachContainer>
          <InputLabel>Attach Tags</InputLabel>
          <Select
            multiple
            value={attachedTags}
            onChange={handleTagChange}
            disabled={tags.length === 0}
            input={<Input />}
            renderValue={(selected) => {
              // obtain tag information
              const associatedTags = tags.filter((tag: Tag) =>
                (selected as string[]).includes(tag._id)
              );

              return (
                <ChipDisplay>
                  {associatedTags.map(({ tagName, tagColor }: Tag) => (
                    <CustomChip
                      key={tagName}
                      label={tagName}
                      backgroundcolor={tagColor}
                    />
                  ))}
                </ChipDisplay>
              );
            }}
          >
            {tags.map((tag: Tag) => (
              <MenuItem key={tag._id} value={tag._id}>
                <Checkbox checked={attachedTags.indexOf(tag._id) > -1} />
                <ListItemText primary={tag.tagName} />
              </MenuItem>
            ))}
          </Select>
        </AttachContainer>
        {isUpdate ? (
          <Button
            color="primary"
            variant="contained"
            onClick={handleUpdateQuestion}
          >
            Update
          </Button>
        ) : (
          <Button
            color="primary"
            variant="contained"
            onClick={handleAddQuestion}
          >
            Add Question
          </Button>
        )}
      </InputContainer>
      <UrlInput
        fullWidth
        required
        label="Leetcode URL"
        placeholder="URL"
        onChange={handleUrlChange}
        value={leetcodeUrl}
      />
      <InputContainer>
        <NoteInput
          fullWidth
          multiline
          label="Add Notes"
          placeholder="Notes"
          onChange={handleNoteInputChange}
          value={noteInput}
        />
        <Button color="primary" variant="contained" onClick={handleAddNote}>
          Add
        </Button>
      </InputContainer>
      <NoteList
        subheader={
          <ListSubheader style={{ textAlign: "center" }}>
            {currentQuestionName === ""
              ? ""
              : `Notes for ${currentQuestionName}`}
          </ListSubheader>
        }
      >
        {notes.map((noteText: string, index: number) => {
          return (
            <ListItem key={`note-item-${index}`} alignItems="center" divider>
              <ListItemText style={{ wordWrap: "normal", textAlign: "center" }}>
                {noteText}
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => {
                    handleRemoveNote(noteText);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </NoteList>
    </FormContainer>
  );
};

export default QuestionForm;
