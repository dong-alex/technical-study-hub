import React, {
  FunctionComponent,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { NavLink, Redirect, RouteComponentProps } from "react-router-dom";
import { Row, Col, Button, TextInput, Dropdown, Icon } from "react-materialize";
import styled from "styled-components";
import NavigationLayout from "../layout/NavigationLayout";
import { Question } from "../../hooks/reducers/questionsReducer";
import { Tag } from "../../hooks/reducers/tagsReducer";
import useQuestions from "../../hooks/useQuestions";

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

const TagForm = styled(Row)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  place-items: center;
  padding: 1rem 0 1rem 0;
`;

interface QuestionPageProps extends RouteComponentProps<QuestionParams> {}

// singular tag overview page
const QuestionPage: FunctionComponent<QuestionPageProps> = ({
  match: {
    params: { id: questionId },
  },
}: QuestionPageProps) => {
  const { questions, updateQuestion } = useQuestions();
  const [currentQuestionName, setCurrentQuestionName] = useState<string>("");
  const [attachedTags, setAttachedTags] = useState<Tag[]>();

  useEffect(() => {
    // grab the corresponding question details
    if (questionId && questions.length > 0) {
      const specificQuestion: Question | undefined = questions.find(
        (question: Question) => question._id === questionId
      );

      if (specificQuestion) {
        console.log("Looking up", specificQuestion);
        const { name, tags } = specificQuestion;
        setCurrentQuestionName(name);
        setAttachedTags(tags);
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

  const handleUpdateQuestion = async () => {
    // await updateQuestion(questionId, currentQuestionName, currentTagColor);
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
    </NavigationLayout>
  );
};

export default QuestionPage;
