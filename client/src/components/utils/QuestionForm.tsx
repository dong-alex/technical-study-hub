import React, {
  FunctionComponent,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
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
  width: 100%;
`;

const NoteInput = styled(TextField)`
  max-width: 500px;
  margin: 0px 2rem;
`;

const InputContainer = styled.div`
  display: flex;
  place-items: center;
  justify-content: center;
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
  background: ${(props: ColorPreviewProps) => props.backgroundcolor};
`;

const NoteList = styled(List)`
  margin: 0 5rem;
  display: flex;
  flex-direction: column;
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
        } = specificQuestion;
        const tagIds = attachedTags.map((tag: Tag) => tag._id);
        setCurrentQuestionName(name);
        setCurrentDifficulty(difficulty);
        setAttachedTags(tagIds);
        setNotes(attachedNotes);
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

  // handle selecting values via materialize-css library
  const handleAddQuestion = async (event: any) => {
    event.preventDefault();
    try {
      await createQuestion(
        currentQuestionName,
        currentDifficulty,
        attachedTags,
        notes
      );
    } catch (err) {
      console.log(err);
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
        notes
      );
      history.push("/questions", { updateSuccess: true });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleAddNote = () => {
    if (noteInput === "") {
      return;
    }

    if (notes.includes(noteInput)) {
      return;
    }

    setNotes([...notes, noteInput]);
    setNoteInput("");
  };

  const handleRemoveNote = (deletedText: string) => {
    const newNotes = notes.filter(
      (noteText: string) => noteText !== deletedText
    );
    setNotes(newNotes);
  };

  return (
    <FormContainer>
      <InputContainer>
        <TextField
          label="Question Title"
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
          Add Note
        </Button>
      </InputContainer>
      <NoteList
        subheader={
          <ListSubheader>
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
