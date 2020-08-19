import React, {
  FunctionComponent,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import useQuestions from "../../hooks/useQuestions";
import NavigationLayout from "../layout/NavigationLayout";
import { TextInput, Button, Icon, Dropdown } from "react-materialize";

type QuestionDashboardPageProps = {};

const QuestionDashboardPage: FunctionComponent<QuestionDashboardPageProps> = () => {
  const { getQuestions } = useQuestions();
  const [questionName, setQuestionName] = useState<string>("");

  useEffect(() => {
    // TODO: cache the results
    const fetch = async () => {
      const questions = await getQuestions();
      console.log(questions);
    };
    fetch();
  }, []);

  const handleQuestionNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setQuestionName(event.target.value);
    } else {
      setQuestionName("");
    }
  };

  return (
    <NavigationLayout>
      <div className="question-page">
        <TextInput
          name="questionTitle"
          label="Question Title"
          onChange={handleQuestionNameChange}
          value={questionName}
        />
        <Dropdown
          options={{
            alignment: "left",
            closeOnClick: true,
            constrainWidth: true,
          }}
          trigger={
            <Button node="button" className="light-blue brighten-2">
              Select Difficulty
            </Button>
          }
        >
          <span>EASY</span>
          <span>MEDIUM</span>
          <span>HARD</span>
        </Dropdown>
      </div>
    </NavigationLayout>
  );
};

export default QuestionDashboardPage;
