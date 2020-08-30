import { useEffect, useReducer } from "react";
import axios from "axios";
import {
  questionsReducer,
  QUESTIONS_INITIAL_STATE,
} from "./reducers/questionsReducer";
import { Tag, Question, QuestionsHookState } from "../types";
import QuestionActions from "./actions/questionActions";
import { useAuthProvider } from "../components/auth/AuthenticationProvider";

export type DifficultyOptions = "EASY" | "MEDIUM" | "HARD" | string;

const useQuestions = (tags: Tag[]): QuestionsHookState => {
  const [questionState, dispatch] = useReducer(
    questionsReducer,
    QUESTIONS_INITIAL_STATE
  );

  const { questions, loadingQuestions } = questionState;
  // const [questions, setQuestions] = useState<Question[]>([]);
  // const [loadingQuestions, setLoadingQuestions] = useState<boolean>(true);
  const { user, token, authenticated } = useAuthProvider();

  // TODO: axios get /api/v1/questions
  const getQuestions = async () => {
    try {
      const {
        data: { questions },
      } = await axios.get("/api/v1/questions");
      console.log("UseQuestions", questions);
      dispatch({
        type: QuestionActions.FETCHED_QUESTIONS,
        payload: { questions: [...questions] },
      });
      return questions;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    const fetch = async () => {
      // skip the process until logged in
      if (!authenticated) {
        return;
      }

      await getQuestions();
    };
    fetch();

    // if there are changes in the tags - propogates changes into the questions
  }, [authenticated, tags]);

  const createQuestion = async (
    name: string,
    difficulty: DifficultyOptions,
    tags: string[],
    notes: string[],
    url: string
  ) => {
    try {
      const {
        data: { question },
      } = await axios.post("/api/v1/questions", {
        name,
        difficulty,
        tags,
        notes,
        url,
      });
      dispatch({
        type: QuestionActions.ADDED_QUESTION,
        payload: { addedQuestion: question },
      });
      return question;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  };

  // TODO: axios delete question DELETE /api/v1/questions
  const deleteQuestion = async (
    questionId: string
  ): Promise<boolean | Error> => {
    try {
      const {
        data: { question },
      } = await axios.delete(`/api/v1/questions/${questionId}`);
      dispatch({
        type: QuestionActions.REMOVED_QUESTION,
        payload: { deletedQuestionId: questionId },
      });

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const updateQuestion = async (
    questionId: string,
    questionName: string,
    difficulty: string,
    attachedTags: string[],
    notes: string[],
    url: string
  ): Promise<Question | Error> => {
    try {
      const {
        data: { question },
      } = await axios.put(`/api/v1/questions/${questionId}`, {
        name: questionName,
        difficulty,
        tags: attachedTags,
        notes,
        url,
      });
      console.log(question);
      dispatch({
        type: QuestionActions.EDITED_QUESTION,
        payload: { question },
      });
      return question;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return {
    questions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    loadingQuestions,
  };
};

export default useQuestions;
