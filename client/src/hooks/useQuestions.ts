import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import {
  Question,
  questionsReducer,
  QUESTIONS_INITIAL_STATE,
} from "./reducers/questionsReducer";
import QuestionActions from "./actions/questionActions";
import { useAuthProvider } from "../components/auth/AuthenticationProvider";

type QuestionsHookState = {
  questions: Question[];
  loadingQuestions: boolean;
  createQuestion: (
    name: string,
    difficulty: string,
    tags: string[],
    notes: string[]
  ) => Promise<Question | Error>;
  updateQuestion: (
    questionId: string,
    questionName: string,
    difficulty: string,
    attachedTags: string[], // reference representation - populated on request
    notes: string[]
  ) => Promise<boolean | Error>;
  deleteQuestion: (questionId: string) => Promise<boolean | Error>;
};

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

      // dispatch here TODO : change different action
      dispatch({
        type: QuestionActions.FETCHED_QUESTIONS,
        payload: { questions },
      });
      // setQuestions(questions);
      // setLoadingQuestions(false);
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
      } = await axios.post("/api/v1/questions", { name, difficulty, tags });
      dispatch({
        type: QuestionActions.ADDED_QUESTION,
        payload: { addedQuestion: question },
      });
      // setQuestions([...questions, question]);
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
        // const newQuestions = questions.filter(
        //   (question: Question) => question._id !== questionId
        // );
        dispatch({
          type: QuestionActions.REMOVED_QUESTION,
          payload: { deletedQuestionId: questionId },
        });
        // setQuestions(newQuestions);
      } else {
        console.log("Did not delete any question");
      }

      return success;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  // TODO: axios update question PUT /api/v1/questions
  const updateQuestion = async (
    questionId: string,
    questionName: string,
    difficulty: string,
    attachedTags: string[],
    notes: string[]
  ) => {
    console.log(questionId, questionName, difficulty, attachedTags);
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
