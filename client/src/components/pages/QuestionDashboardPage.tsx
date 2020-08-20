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
  const { tags } = useTags();

  const [totalPages, setTotalPages] = useState<number>(1);
  const [tableQuestions, setTableQuestions] = useState<Question[]>([]);
  const [questionName, setQuestionName] = useState<string>("");
  const { page, handlePageUp, handlePageDown } = usePagination(totalPages);

  // document select within the difficulty select to pull values
  const questionsPerPage = 10;

  useEffect(() => {
    setTotalPages(1 + questions.length / questionsPerPage);
  }, [questions]);

  useEffect(() => {
    console.log("Obtained questions", questions);
    // depending on the page - set the questions 10 at a time per page
    const offset = (page - 1) * questionsPerPage;
    const displayQuestions: Question[] = questions.slice(
      offset,
      offset + questionsPerPage
    );
    setTableQuestions(displayQuestions);
  }, [questions, page]);

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
        <Select
          id="difficulty-select"
          multiple={false}
          options={{
            dropdownOptions: {
              alignment: "left",
              autoTrigger: true,
              closeOnClick: true,
              constrainWidth: true,
              coverTrigger: true,
              hover: false,
              inDuration: 150,
              outDuration: 250,
            },
          }}
          value={"EASY"}
        >
          <option disabled value="">
            Set Difficulty
          </option>
          <option value="EASY">EASY</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HARD">HARD</option>
        </Select>
        <Select
          id="tags-select"
          multiple
          options={{
            dropdownOptions: {
              alignment: "left",
              autoTrigger: true,
              closeOnClick: true,
              constrainWidth: true,
              coverTrigger: true,
              hover: false,
              inDuration: 150,
              outDuration: 250,
            },
          }}
          value={""}
        >
          <option disabled value="">
            Add tags
          </option>
          {tags.map((tag: Tag) => (
            <option key={tag._id} value={tag._id}>
              {tag.tagName}
            </option>
          ))}
        </Select>
        <Button
          className="light-blue lighten-2 hoverable"
          onClick={handleAddQuestion}
        >
          Add Question
        </Button>
      </QuestionForm>
      <TableContainer>
        {loadingQuestions ? (
          <LoadingOverlay />
        ) : (
          <>
            <Table centered>
              <thead>
                <tr>
                  <th data-field="id">Question</th>
                  <th data-field="tags-attached">Tags</th>
                  <th data-field="created-on">Created On</th>
                  <th data-field="actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableQuestions.map((question: Question) => {
                  return (
                    <tr key={question._id}>
                      <td>
                        <NavLink to={`/questions/${question._id}`}>
                          {question.name}
                        </NavLink>
                      </td>
                      <td>{question.tags.length}</td>
                      <td>{question.createdDate}</td>
                      <td>
                        <TableActions>
                          <Button
                            floating
                            className="red"
                            tooltip="Delete Question"
                            onClick={() => {}}
                            icon={<Icon>delete</Icon>}
                          />
                        </TableActions>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <CustomPagination
              activePage={page}
              items={totalPages}
              leftBtn={
                <PageButton
                  className="light-blue lighten-2"
                  onClick={handlePageDown}
                  icon={<Icon>chevron_left</Icon>}
                />
              }
              rightBtn={
                <PageButton
                  className="light-blue lighten-2"
                  onClick={handlePageUp}
                  icon={<Icon>chevron_right</Icon>}
                />
              }
            />
          </>
        )}
      </TableContainer>
    </NavigationLayout>
  );
};

export default QuestionDashboardPage;
