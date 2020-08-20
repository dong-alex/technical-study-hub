import React, {
  FunctionComponent,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { NavLink } from "react-router-dom";
import {
  TextInput,
  Button,
  Icon,
  Select,
  Dropdown,
  Table,
  Pagination,
} from "react-materialize";
import M from "materialize-css";
import styled from "styled-components";
import useQuestions, { DifficultyOptions } from "../../hooks/useQuestions";
import useTags from "../../hooks/useTags";
import { Question } from "../../hooks/reducers/questionsReducer";
import NavigationLayout from "../layout/NavigationLayout";
import LoadingOverlay from "../utils/LoadingOverlay";
import usePagination from "../../hooks/usePagination";
import { Tag } from "../../hooks/reducers/tagsReducer";
import TagSelectDropdown from "../utils/TagSelectDropdown";
import DifficultySelectDropdown from "../utils/DifficultySelectDropdown";
import TableDashboard from "../utils/TableDashboard";

type QuestionDashboardPageProps = {};
type ColorPreviewProps = {
  backgroundColor: string;
};

const TableContainer = styled.div`
  height: 100%;
`;

const TableActions = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-evenly;
`;

const CustomPagination = styled(Pagination)`
  height: 100%;
  display: flex;
  justify-content: center;
  > li {
    &:first-child {
      padding: 0px;
      width: auto;
      height: auto;
    }
    &:last-child {
      padding: 0px;
      width: auto;
      height: auto;
    }

    > a {
      padding: 0;
    }

    max-width: 200px;
    padding: 0 1rem 0 1rem;
    margin: 0 1rem 0 1rem;
  }
`;

const PageButton = styled(Button)`
  width: 100%;
`;

const QuestionForm = styled.div`
  display: flex;
  place-items: center;
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

const QuestionDashboardPage: FunctionComponent<QuestionDashboardPageProps> = () => {
  const { questions, loadingQuestions, createQuestion } = useQuestions();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [questionName, setQuestionName] = useState<string>("");

  // TODO: more proper validation with errors
  const handleQuestionNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setQuestionName(event.target.value);
    } else {
      setQuestionName("");
    }
  };

  // handle selecting values via materialize-css library
  const handleAddQuestion = async () => {
    const difficultyElement = document.getElementById("difficulty-select");
    const tagsElement = document.getElementById("tags-select");

    // something would be very wrong with the rendering
    if (!difficultyElement || !tagsElement) {
      return false;
    }

    const difficultyInstance = M.FormSelect.getInstance(difficultyElement);
    const tagsInstance = M.FormSelect.getInstance(tagsElement);

    const difficulty: DifficultyOptions = difficultyInstance.getSelectedValues()[0];
    const attachedTags: string[] = tagsInstance.getSelectedValues();

    await createQuestion(questionName, difficulty, attachedTags);
  };

  return (
    <NavigationLayout>
      <h4>Question Dashboard</h4>
      <h6>Create New Questions</h6>
      <QuestionForm>
        <TextInput
          name="questionTitle"
          label="Question Title"
          onChange={handleQuestionNameChange}
          value={questionName}
        />
        <DifficultySelectDropdown />
        <TagSelectDropdown />
        <Button
          className="light-blue lighten-2 hoverable"
          onClick={handleAddQuestion}
        >
          Add Question
        </Button>
      </QuestionForm>
      <TableDashboard
        data={questions}
        isTag={false}
        loadingState={loadingQuestions}
      />
    </NavigationLayout>
  );
};

export default QuestionDashboardPage;
