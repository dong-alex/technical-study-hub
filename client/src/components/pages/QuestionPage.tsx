import React, {
  FunctionComponent,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { Button, TextInput, Icon } from "react-materialize";
import styled from "styled-components";
import NavigationLayout from "../layout/NavigationLayout";
import { Question } from "../../hooks/reducers/questionsReducer";
import { Tag } from "../../hooks/reducers/tagsReducer";
import useQuestions from "../../hooks/useQuestions";
import QuestionForm from "../utils/QuestionForm";

type QuestionParams = { id: string };

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

interface QuestionPageProps extends RouteComponentProps<QuestionParams> {}

// singular tag overview page
const QuestionPage: FunctionComponent<QuestionPageProps> = ({
  match: {
    params: { id: questionId },
  },
}: QuestionPageProps) => {
  const { questions, updateQuestion } = useQuestions();
  const [currentDifficulty, setCurrentDifficulty] = useState<string>("EASY");
  const [currentQuestionName, setCurrentQuestionName] = useState<string>("");
  const [attachedTags, setAttachedTags] = useState<string[]>([]);

  useEffect(() => {
    // grab the corresponding question details
    if (questionId && questions.length > 0) {
      const specificQuestion: Question | undefined = questions.find(
        (question: Question) => question._id === questionId
      );

      if (specificQuestion) {
        console.log("Looking up", specificQuestion);
        const { name, tags, difficulty } = specificQuestion;
        const tagIds = tags.map((tag: Tag) => tag._id);
        setCurrentQuestionName(name);
        setAttachedTags(tagIds);
        setCurrentDifficulty(difficulty);
      } else {
        // these errors should not be hit
        throw new Error("Questions empty");
      }
      // set the current UI with these details
    }
  }, [questions, questionId]);

  // TODO: validation with the string length of total # questions
  const handleQuestionNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentQuestionName(event.target.value);
  };

  return (
    <NavigationLayout>
      <Header>
        <NavLink to="/questions">
          <Button floating icon={<Icon>chevron_left</Icon>} />
        </NavLink>
        <Title>Question Details</Title>
      </Header>
      <h6>Update Your Question</h6>
      <QuestionForm questionId={questionId} isUpdate />
    </NavigationLayout>
  );
};

export default QuestionPage;
