import { useEffect, useReducer } from "react";
import axios from "axios";
import {
  questionsReducer,
  QUESTIONS_INITIAL_STATE,
} from "./reducers/questionsReducer";
import { QuestionsHookState } from "../types";
import QuestionActions from "./actions/questionActions";
import { useAuthProvider } from "../components/auth/AuthenticationProvider";

export type DifficultyOptions = "EASY" | "MEDIUM" | "HARD" | string;

const useQuestions = (): QuestionsHookState => {
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
    if (!user || !token) {
      throw new Error("No user found. Please try again.");
    }

    try {
      const {
        data: { questions },
      } = await axios.get("/api/v1/questions");
      dispatch({
        type: QuestionActions.FETCHED_QUESTIONS,
        payload: { questions },
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
  }, []);

  const createQuestion = async (
    name: string,
    difficulty: DifficultyOptions,
    tags: string[],
    notes: string[]
  ) => {
    if (name === "") {
      throw new Error("Empty name. Please try again.");
    }

    if (!user || !token) {
      throw new Error("No user found. Please try again.");
    }

    try {
      const {
        data: { question },
      } = await axios.post("/api/v1/questions", {
        name,
        difficulty,
        tags,
        notes,
      });
      dispatch({
        type: QuestionActions.ADDED_QUESTION,
        payload: { addedQuestion: question },
      });
      return question;
    } catch (err) {
      throw err;
    }
  };

  // TODO: axios delete question DELETE /api/v1/questions
  const deleteQuestion = async (questionId: string) => {
    try {
      const { data: success } = await axios.delete(
        `/api/v1/questions/${questionId}`
      );
      if (success) {
        dispatch({
          type: QuestionActions.REMOVED_QUESTION,
          payload: { deletedQuestionId: questionId },
        });
      } else {
        console.log("Did not delete any question");
      }

      return success;
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
    notes: string[]
  ) => {
    try {
      const { data: question } = await axios.put(
        `/api/v1/questions/${questionId}`,
        {
          name: questionName,
          difficulty,
          tags: attachedTags,
          notes,
        }
      );
      dispatch({
        type: QuestionActions.EDITED_QUESTION,
        payload: { question },
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      return true;
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
